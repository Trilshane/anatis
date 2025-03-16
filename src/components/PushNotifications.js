import React, { useState, useEffect, useRef } from "react";
import { Platform } from "react-native";
import { connect } from "react-redux";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Device from "expo-device";

import { postDeviceToken } from "../redux/actions/appActions";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const PushNotifications = ({ postDeviceToken }) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [channels, setChannels] = useState([]);
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // registerForPushNotificationsAsync().then((token) => {
    //   setExpoPushToken(token)
    //   setTimeout(() => {
    //     postDeviceToken({token})
    //   }, 3000)
    // })

    // notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
    //   setNotification(notification)
    // })

    // responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
    //   console.log(response)
    // })

    // return () => {
    //   Notifications.removeNotificationSubscription(notificationListener.current)
    //   Notifications.removeNotificationSubscription(responseListener.current)
    // }

    registerForPushNotificationsAsync().then((token) => {
      token && setExpoPushToken(token);
      setTimeout(() => {
        postDeviceToken({ token });
      }, 3000);
    });

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? [])
      );
    }
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    // <View style={{marginVertical: 20, borderColor: 'red', borderWidth: 1}}>
    //   <TextInput style={{textAlign: 'center'}} value={expoPushToken} />
    // </View>
    <></>
  );
};

const mapDispatchToProps = {
  postDeviceToken,
};

export default connect(null, mapDispatchToProps)(PushNotifications);

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error("Project ID not found");
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
      return token;
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
