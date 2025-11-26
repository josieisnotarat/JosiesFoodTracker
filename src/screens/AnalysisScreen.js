import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../utils/colors';
import { useDiary } from '../context/DiaryContext';

const AnalysisScreen = () => {
  const { diaryByDate, targets } = useDiary();
  const days = Object.values(diaryByDate).slice(-7);

  const average = days.reduce(
    (acc, day) => ({
      calories: acc.calories + (day.totals.calories || 0),
      protein: acc.protein + (day.totals.protein || 0),
      carbs: acc.carbs + (day.totals.carbs || 0),
      fats: acc.fats + (day.totals.fats || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 },
  );
  const divider = Math.max(days.length, 1);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>Weekly insights</Text>
      <Text style={styles.subtitle}>Rolling last {divider} days</Text>

      <View style={styles.card}>
        {['calories', 'protein', 'carbs', 'fats'].map((metric) => (
          <View key={metric} style={styles.row}>
            <Text style={styles.label}>{metric.toUpperCase()}</Text>
            <Text style={styles.value}>{Math.round(average[metric] / divider)}</Text>
            <Text style={styles.helper}>Target {targets[metric] || '-'} / day</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.section}>Compliance</Text>
        <Text style={styles.helper}>Shows how close you stay to your macro plan.</Text>
        {days.map((day) => (
          <View key={day.date} style={styles.row}> 
            <Text style={styles.label}>{day.date}</Text>
            <Text style={styles.value}>{Math.round((day.totals.calories / targets.calories) * 100)}%</Text>
            <Text style={styles.helper}>{Math.round(day.totals.calories)} kcal</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: { fontSize: 22, fontWeight: '800', color: colors.text },
  subtitle: { color: colors.darkGray, marginBottom: 14 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: { fontWeight: '700', color: colors.text },
  value: { fontWeight: '800', color: colors.purple },
  helper: { color: colors.darkGray, fontSize: 12 },
  section: { fontWeight: '700', marginBottom: 6, color: colors.text },
});

export default AnalysisScreen;
