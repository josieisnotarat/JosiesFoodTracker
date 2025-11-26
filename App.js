import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ScannerScreen from './src/screens/ScannerScreen';
import PlanScreen from './src/screens/PlanScreen';
import AnalysisScreen from './src/screens/AnalysisScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { DiaryProvider } from './src/context/DiaryContext';
import colors from './src/utils/colors';

const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.yellow,
    background: colors.background,
    text: colors.text,
    card: '#ffffff',
    border: colors.lightGray,
  },
};

export default function App() {
  return (
    <DiaryProvider>
      <NavigationContainer theme={theme}>
        <StatusBar style="dark" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.yellow,
            tabBarInactiveTintColor: colors.darkGray,
            tabBarStyle: {
              backgroundColor: '#fff',
              borderTopColor: colors.lightGray,
              height: 70,
              paddingBottom: 10,
              paddingTop: 10,
            },
            tabBarIcon: ({ color, size }) => {
              const icons = {
                Scanner: 'scan-outline',
                Plan: 'pie-chart-outline',
                Analysis: 'bar-chart-outline',
                Settings: 'settings-outline',
              };
              return <Ionicons name={icons[route.name]} size={size} color={color} />;
            },
          })}
          initialRouteName="Plan"
        >
          <Tab.Screen name="Scanner" component={ScannerScreen} />
          <Tab.Screen name="Plan" component={PlanScreen} />
          <Tab.Screen name="Analysis" component={AnalysisScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </DiaryProvider>
  );
}
