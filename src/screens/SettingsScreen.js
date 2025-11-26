import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import colors from '../utils/colors';
import { useDiary } from '../context/DiaryContext';

const SettingsScreen = () => {
  const { carbLimit, setCarbLimit, targets } = useDiary();
  const [draft, setDraft] = useState(String(carbLimit));

  const updateLimit = (value) => {
    setDraft(value);
    const numeric = Number(value);
    if (!Number.isNaN(numeric)) setCarbLimit(numeric);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Tune thresholds and macro targets.</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Carb alert limit</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={draft}
          onChangeText={updateLimit}
        />
        <Text style={styles.helper}>Meals above this will show a warning before logging.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Default daily targets</Text>
        {Object.entries(targets).map(([key, value]) => (
          <View key={key} style={styles.row}>
            <Text style={styles.metric}>{key.toUpperCase()}</Text>
            <Text style={styles.value}>{value}{key === 'calories' ? '' : ' g'}</Text>
          </View>
        ))}
        <Text style={styles.helper}>Targets can be wired to remote profile storage later.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  title: { fontSize: 22, fontWeight: '800', color: colors.text },
  subtitle: { color: colors.darkGray, marginBottom: 14 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  label: { fontWeight: '700', color: colors.text, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fafafa',
  },
  helper: { color: colors.darkGray, marginTop: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  metric: { color: colors.text, fontWeight: '700' },
  value: { color: colors.purple, fontWeight: '800' },
});

export default SettingsScreen;
