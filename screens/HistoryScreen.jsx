import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Aqui será exibido o histórico diário dos passos.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#141526', // Cor de fundo primária
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFFFFF', // Texto em branco
  },
});
