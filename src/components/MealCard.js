import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../utils/colors';

const MealCard = ({ meal }) => (
  <View style={styles.card}>
    <View style={styles.headerRow}>
      <Text style={styles.title}>{meal.name}</Text>
      <Text style={styles.mealType}>{meal.type}</Text>
    </View>
    <Text style={styles.note}>{meal.note || meal.source || 'Logged item'}</Text>
    <View style={styles.row}>
      <Text style={styles.macro}>Calories {Math.round(meal.calories || 0)}</Text>
      <Text style={styles.macro}>P {Math.round(meal.protein || 0)}g</Text>
      <Text style={styles.macro}>C {Math.round(meal.carbs || 0)}g</Text>
      <Text style={styles.macro}>F {Math.round(meal.fats || 0)}g</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  mealType: {
    fontSize: 12,
    color: colors.purple,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f1edff',
    borderRadius: 8,
  },
  note: {
    color: colors.darkGray,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  macro: {
    color: colors.text,
    fontWeight: '600',
  },
});

export default MealCard;
