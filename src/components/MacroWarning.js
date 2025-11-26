import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../utils/colors';

const MacroWarning = ({ carbs, limit }) => {
  if (carbs <= limit) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carb alert</Text>
      <Text style={styles.body}>
        You planned {Math.round(carbs)} g carbs which is above your {limit} g limit. You can still log it
        if you want to override.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff7f5',
    borderColor: colors.orange,
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    color: colors.orange,
    fontWeight: '800',
    marginBottom: 4,
  },
  body: {
    color: colors.text,
    lineHeight: 18,
  },
});

export default MacroWarning;
