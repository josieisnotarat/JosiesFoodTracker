import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../utils/colors';

const macroColors = {
  protein: colors.purple,
  carbs: colors.yellow,
  fats: colors.orange,
};

const MacroGrid = ({ totals = {} }) => (
  <View style={styles.row}>
    {['protein', 'carbs', 'fats'].map((macro) => (
      <View key={macro} style={styles.card}>
        <View style={[styles.icon, { backgroundColor: macroColors[macro] }]} />
        <Text style={styles.label}>{macro.charAt(0).toUpperCase() + macro.slice(1)}</Text>
        <Text style={styles.value}>{Math.round(totals[macro] || 0)} g</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  icon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginBottom: 10,
  },
  label: {
    color: colors.darkGray,
    fontSize: 13,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 6,
  },
});

export default MacroGrid;
