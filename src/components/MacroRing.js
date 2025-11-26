import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import colors from '../utils/colors';

const circumference = 2 * Math.PI * 52;

const MacroRing = ({ label, value = 0, target = 1, color = colors.yellow }) => {
  const progress = Math.min(value / target, 1);
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <View style={styles.container}>
      <View style={styles.ringContainer}>
        <Svg width="140" height="140" viewBox="0 0 140 140">
          <Circle
            cx="70"
            cy="70"
            r="52"
            stroke={colors.lightGray}
            strokeWidth="12"
            fill="none"
          />
          <Circle
            cx="70"
            cy="70"
            r="52"
            stroke={color}
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 70 70)"
          />
        </Svg>
        <View style={styles.center}>
          <Text style={styles.value}>{Math.round(value)}</Text>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.sub}>left</Text>
        </View>
      </View>
      <Text style={styles.target}>Target: {target}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  ringContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  label: {
    color: colors.darkGray,
    fontSize: 14,
    marginTop: 4,
  },
  sub: {
    color: colors.darkGray,
    fontSize: 12,
  },
  target: {
    color: colors.darkGray,
    fontSize: 12,
  },
});

export default MacroRing;
