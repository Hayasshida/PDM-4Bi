import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { MaterialIcons } from '@expo/vector-icons';
import {
  scheduleDailyNotification,
  cancelAllNotifications,
  loadNotificationSetting,
  saveNotificationSetting
} from '../services/notificationService';

export default function HomeScreen() {
  const [stepCount, setStepCount] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  useEffect(() => {
    loadNotificationPreference();
  }, []);

  useEffect(() => {
    let stepInterval;
    if (isCounting) {
      Accelerometer.setUpdateInterval(1000); // Atualiza a cada segundo
      stepInterval = Accelerometer.addListener(accelerometerData => {
        if (detectStep(accelerometerData)) {
          setStepCount(prev => prev + 1);
        }
      });
    } else {
      Accelerometer.removeAllListeners();
    }
    return () => {
      if (stepInterval) stepInterval.remove();
    };
  }, [isCounting]);

  const detectStep = (data) => {
    const { x, y, z } = data;
    const acceleration = Math.sqrt(x * x + y * y + z * z);
    return acceleration > 1.2; // Ajuste o threshold conforme necessário
  };

  const handleToggleCounting = () => {
    setIsCounting(!isCounting);
  };

  const loadNotificationPreference = async () => {
    const savedPreference = await loadNotificationSetting();
    setIsNotificationsEnabled(savedPreference);
  };

  const toggleNotifications = async () => {
    const newValue = !isNotificationsEnabled;
    setIsNotificationsEnabled(newValue);
    await saveNotificationSetting(newValue);

    if (newValue) {
      await scheduleDailyNotification();
    } else {
      await cancelAllNotifications();
    }
  };

  return (
    <View style={styles.container}>
      {/* Seção para o sininho e o seletor */}
      <View style={styles.notificationContainer}>
        <MaterialIcons name="notifications" size={28} color="#FFFFFF" />
        <Switch
          value={isNotificationsEnabled}
          onValueChange={toggleNotifications}
          trackColor={{ false: "#767577", true: "#3DDC84" }}
          thumbColor={isNotificationsEnabled ? "#FFFFFF" : "#f4f3f4"}
          style={styles.notificationSwitch}
        />
      </View>

      {/* Botão de Início e Contador de Passos */}
      <TouchableOpacity onPress={handleToggleCounting} style={styles.button}>
        <Text style={styles.buttonText}>
          {isCounting ? `Passos: ${stepCount}` : 'Iniciar Contagem'}
        </Text>
      </TouchableOpacity>
      {isCounting && (
        <TouchableOpacity onPress={handleToggleCounting} style={styles.stopButton}>
          <Text style={styles.stopButtonText}>Parar</Text>
        </TouchableOpacity>
      )}
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
  notificationContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationSwitch: {
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#2E8B57',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 80,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  stopButton: {
    marginTop: 20,
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
  },
  stopButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});
