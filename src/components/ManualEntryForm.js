import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../utils/colors';
import { useDiary } from '../context/DiaryContext';

const ManualEntryForm = () => {
  const { addMeal } = useDiary();
  const [form, setForm] = useState({
    name: 'Custom meal',
    type: 'Snack',
    calories: '320',
    protein: '25',
    carbs: '28',
    fats: '9',
  });

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const save = () => {
    addMeal({
      ...form,
      calories: Number(form.calories) || 0,
      protein: Number(form.protein) || 0,
      carbs: Number(form.carbs) || 0,
      fats: Number(form.fats) || 0,
      type: form.type || 'Snack',
      source: 'Manual',
      createdAt: new Date().toISOString(),
    });
  };

  const fields = [
    { key: 'name', label: 'Meal name', keyboardType: 'default' },
    { key: 'type', label: 'Meal type', keyboardType: 'default' },
    { key: 'calories', label: 'Calories', keyboardType: 'numeric' },
    { key: 'protein', label: 'Protein (g)', keyboardType: 'numeric' },
    { key: 'carbs', label: 'Carbs (g)', keyboardType: 'numeric' },
    { key: 'fats', label: 'Fats (g)', keyboardType: 'numeric' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manual add</Text>
      <View style={styles.fieldRow}>
        {fields.map((field) => (
          <View key={field.key} style={styles.field}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={styles.input}
              value={form[field.key]}
              keyboardType={field.keyboardType}
              onChangeText={(text) => update(field.key, text)}
            />
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={save}>
        <Ionicons name="checkmark-circle" size={22} color="#fff" />
        <Text style={styles.buttonText}>Save meal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
  },
  header: {
    fontWeight: '700',
    fontSize: 16,
    color: colors.text,
    marginBottom: 10,
  },
  fieldRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  field: {
    width: '48%',
    marginBottom: 10,
  },
  label: {
    color: colors.darkGray,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fafafa',
  },
  button: {
    marginTop: 8,
    backgroundColor: colors.purple,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default ManualEntryForm;
