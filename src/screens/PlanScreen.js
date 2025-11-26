import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MacroRing from '../components/MacroRing';
import MacroGrid from '../components/MacroGrid';
import ManualEntryForm from '../components/ManualEntryForm';
import MacroWarning from '../components/MacroWarning';
import colors from '../utils/colors';
import { useDiary } from '../context/DiaryContext';

const PlanScreen = () => {
  const { diaryByDate, activeDate, targets, carbLimit } = useDiary();
  const today = diaryByDate[activeDate] || { meals: [], totals: { calories: 0, protein: 0, carbs: 0, fats: 0 } };

  const caloriesLeft = Math.max(targets.calories - today.totals.calories, 0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greeting}>Today</Text>
          <Text style={styles.sub}>{activeDate}</Text>
        </View>
        <TouchableOpacity style={styles.avatar}>
          <Ionicons name="person" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Calories left</Text>
          <Ionicons name="time-outline" size={20} color={colors.darkGray} />
        </View>
        <MacroRing label="Calories" value={caloriesLeft} target={targets.calories} color={colors.yellow} />
        <MacroGrid totals={today.totals} />
      </View>

      <MacroWarning carbs={today.totals.carbs} limit={carbLimit} />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Meals</Text>
        <Text style={styles.sub}>{today.meals.length} logged</Text>
      </View>
      {today.meals.map((meal) => (
        <View key={meal.createdAt} style={{ marginBottom: 8 }}>
          <Text style={styles.mealLabel}>{meal.type}</Text>
          <View>
            <Text style={styles.mealName}>{meal.name}</Text>
            <Text style={styles.mealMacros}>
              {Math.round(meal.calories)} kcal • P {Math.round(meal.protein)}g • C {Math.round(meal.carbs)}g • F {Math.round(meal.fats)}g
            </Text>
          </View>
        </View>
      ))}
      <ManualEntryForm />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  sub: {
    color: colors.darkGray,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  sectionHeader: {
    marginTop: 18,
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealLabel: {
    color: colors.darkGray,
    marginTop: 8,
  },
  mealName: {
    fontWeight: '700',
    fontSize: 15,
    color: colors.text,
  },
  mealMacros: {
    color: colors.darkGray,
  },
});

export default PlanScreen;
