import { AsyncStorage } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { KEY_FOR_NOTIFICATION } from '../constants';

const createNotification = () => {
  return {
    title: "Nothing Learned Today, Get Started Now",
    body: "👋Questions Added to Your Deck Start Answering Now",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  };
}

export const setNotification = () => {
  console.log('setNotification invoked ..');
  AsyncStorage.getItem(KEY_FOR_NOTIFICATION)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === "granted") {
              Notifications.cancelAllScheduledNotificationsAsync();
              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(10);
              Notifications.scheduleLocalNotificationAsync(createNotification(), {
                time: tomorrow,
                repeat: "day"
              });
              AsyncStorage.setItem(KEY_FOR_NOTIFICATION, JSON.stringify(true));
            }
        });
      }
    });
}

export const removeNotification = () => {
  console.log('removeNotification invoked ..');
  return AsyncStorage.removeItem(KEY_FOR_NOTIFICATION)
          .then(Notifications.cancelAllScheduledNotificationsAsync);
}
