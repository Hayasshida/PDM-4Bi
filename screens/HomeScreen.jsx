import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import {
  scheduleDailyNotification,
  cancelAllNotifications,
  loadNotificationSetting,
  saveNotificationSetting
} from '../services/notificationService';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


export default function HomeScreen() {
  const [stepCount, setStepCount] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  useEffect(() => {
    requestNotificationPermissions();
    loadNotificationPreference();
  }, []);

  // Função para solicitar permissões de notificação
  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão de notificação negada.');
      Alert.alert(
        "Permissão Necessária",
        "As notificações estão desativadas. Ative-as nas configurações para receber lembretes diários."
      );
    } else {
      console.log('Permissão de notificação concedida.');
    }
  };

  useEffect(() => {
    let stepInterval;
    if (isCounting) {
      Accelerometer.setUpdateInterval(1000);
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
    return acceleration > 1.2;
  };

  const handleToggleCounting = () => {
    if (isCounting) {
      saveDailySteps(stepCount);
      setStepCount(0); // Reiniciar a contagem para o próximo dia
    }
    setIsCounting(!isCounting);
  };

  const saveDailySteps = async (steps) => {
    const today = new Date().toISOString().split('T')[0];
    try {
      const savedData = await AsyncStorage.getItem('stepHistory');
      const history = savedData ? JSON.parse(savedData) : {};
      history[today] = steps;
      await AsyncStorage.setItem('stepHistory', JSON.stringify(history));
    } catch (error) {
      console.error("Erro ao salvar o histórico de passos:", error);
    }
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

  const sendTestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Teste de Notificação Imediata",
        body: "Verifique se a notificação aparece agora.",
        sound: "./local/assets/notification_sound.wav", // verifique o caminho do som
        color: "#ffffff",
      },
      trigger: null, // dispara a notificação imediatamente
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.notificationContainer}>
        <MaterialIcons name="notifications" size={28} color="#FFFFFF" />
        <Switch
          value={isNotificationsEnabled}
          onValueChange={toggleNotifications}
          trackColor={{ false: "#767577", true: "#2E8B57" }}
          thumbColor={isNotificationsEnabled ? "#FFFFFF" : "#f4f3f4"}
          style={styles.notificationSwitch}
        />
      </View>

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

      {/* Botão para Enviar Notificação de Teste */}
      <TouchableOpacity onPress={sendTestNotification} style={styles.testNotificationButton}>
        <Text style={styles.testNotificationText}>Enviar Notificação de Teste</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#141526',
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
  testNotificationButton: {
    marginTop: 20,
    backgroundColor: '#2E8B57',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
  },
  testNotificationText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
