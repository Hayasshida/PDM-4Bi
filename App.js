import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import HistoryScreen from './screens/HistoryScreen';

const Drawer = createDrawerNavigator();

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#141526',
    text: '#FFFFFF',
    card: '#1F1F2E',        
  },
};

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Histórico" component={HistoryScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
