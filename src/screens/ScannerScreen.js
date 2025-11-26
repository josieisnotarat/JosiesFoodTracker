import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import colors from '../utils/colors';
import { useNutritionProviders } from '../hooks/useNutritionProviders';
import { useDiary } from '../context/DiaryContext';

const ScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [barcodeMode, setBarcodeMode] = useState(false);
  const [lastMeal, setLastMeal] = useState(null);
  const { lookupBarcode, estimateFromPhoto } = useNutritionProviders();
  const { addMeal, carbLimit } = useDiary();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const confirmAndAdd = (meal) => {
    if (meal.carbs > carbLimit) {
      Alert.alert(
        'High carbs',
        `This item has ${Math.round(meal.carbs)} g carbs which is above your limit of ${carbLimit} g. Log it anyway?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Log', onPress: () => addMeal({ ...meal, createdAt: new Date().toISOString() }) },
        ],
      );
      return;
    }
    addMeal({ ...meal, createdAt: new Date().toISOString() });
  };

  const handleBarcodeScanned = async ({ data }) => {
    const result = await lookupBarcode(data);
    if (result) {
      setLastMeal(result);
      confirmAndAdd({ ...result, type: 'Snack', note: 'Barcode scan' });
    }
    setBarcodeMode(false);
  };

  const handlePhotoEstimate = async () => {
    const estimate = await estimateFromPhoto();
    setLastMeal(estimate);
    confirmAndAdd({ ...estimate, type: 'Lunch', note: 'Photo estimate' });
  };

  const actionButtons = [
    { icon: 'scan', label: 'Scan food', onPress: handlePhotoEstimate },
    { icon: 'barcode', label: 'Barcode', onPress: () => setBarcodeMode(true) },
    { icon: 'book', label: 'Recent', onPress: () => lastMeal && confirmAndAdd({ ...lastMeal, note: 'Re-log' }) },
    { icon: 'images', label: 'Library', onPress: handlePhotoEstimate },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanner</Text>
      <Text style={styles.subtitle}>Auto-fill macros from barcode or photo.</Text>

      <View style={styles.cameraCard}>
        {barcodeMode && hasPermission ? (
          <BarCodeScanner style={styles.scanner} onBarCodeScanned={handleBarcodeScanned}>
            <View style={styles.focusSquare} />
          </BarCodeScanner>
        ) : (
          <ImageBackground
            style={styles.placeholder}
            source={{ uri: 'https://images.unsplash.com/photo-1604908177520-4029c2164e02?auto=format&fit=crop&w=800&q=60' }}
            resizeMode="cover"
            imageStyle={{ borderRadius: 16 }}
          >
            <View style={styles.overlay}>
              <View style={styles.focusSquare} />
            </View>
          </ImageBackground>
        )}
      </View>

      <View style={styles.actions}>
        {actionButtons.map((action) => (
          <TouchableOpacity key={action.label} style={styles.actionBtn} onPress={action.onPress}>
            <Ionicons name={action.icon} size={22} color={colors.purple} />
            <Text style={styles.actionText}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {lastMeal && (
        <View style={styles.resultCard}>
          <Text style={styles.label}>Last detection</Text>
          <Text style={styles.mealName}>{lastMeal.name}</Text>
          <Text style={styles.details}>
            {Math.round(lastMeal.calories)} kcal • P {Math.round(lastMeal.protein)}g • C {Math.round(lastMeal.carbs)}g • F {Math.round(lastMeal.fats)}g
          </Text>
          <Text style={styles.helper}>Source: {lastMeal.source}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  title: { fontSize: 22, fontWeight: '800', color: colors.text },
  subtitle: { color: colors.darkGray, marginBottom: 14 },
  cameraCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  placeholder: { height: 240, justifyContent: 'center', alignItems: 'center' },
  scanner: { height: 240, justifyContent: 'center', alignItems: 'center' },
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.1)' },
  focusSquare: {
    width: 180,
    height: 180,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 18,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginHorizontal: 6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  actionText: { marginTop: 6, color: colors.text, fontWeight: '700' },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  label: { color: colors.darkGray },
  mealName: { fontSize: 16, fontWeight: '800', color: colors.text },
  details: { color: colors.text, marginTop: 4 },
  helper: { color: colors.darkGray, marginTop: 4 },
});

export default ScannerScreen;
