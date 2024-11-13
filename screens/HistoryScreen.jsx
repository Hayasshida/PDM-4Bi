import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const savedData = await AsyncStorage.getItem('stepHistory');
      const historyData = savedData ? JSON.parse(savedData) : {};
      const historyArray = Object.keys(historyData).map(date => ({
        date,
        steps: historyData[date],
      }));
      setHistory(historyArray.reverse()); // Reverte para mostrar o mais recente primeiro
    } catch (error) {
      console.error("Erro ao carregar o histórico de passos:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.steps}>{item.steps} passos</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Histórico de Passos</Text>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.date}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#141526',
  },
  header: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
  },
  date: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  steps: {
    fontSize: 18,
    color: '#2E8B57',
  },
});