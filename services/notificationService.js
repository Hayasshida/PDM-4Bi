import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para agendar a notificação diária
export const scheduleDailyNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Resumo diário de passos",
      body: "Veja quantos passos você deu hoje!",
    },
    trigger: { hour: 20, minute: 0, repeats: true },
  });
};

// Função para cancelar todas as notificações agendadas
export const cancelAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

// Função para carregar a configuração de notificações do AsyncStorage
export const loadNotificationSetting = async () => {
  const savedSetting = await AsyncStorage.getItem('notificationsEnabled');
  return savedSetting ? JSON.parse(savedSetting) : false;
};

// Função para salvar a configuração de notificações no AsyncStorage
export const saveNotificationSetting = async (isEnabled) => {
  await AsyncStorage.setItem('notificationsEnabled', JSON.stringify(isEnabled));
};
