import React from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { setCustomText } from "react-native-global-props";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import store from "./src/redux/store";

import StackNavigator from "./src/navigation/StackNavigator";

import PushNotifications from "./src/components/PushNotifications";

export default function App() {
  let [fontsIsLoaded] = useFonts({
    Inter: require("./src/assets/fonts/Inter.ttf"), // 400
    InterMedium: require("./src/assets/fonts/InterMedium.ttf"), // 500
    InterSemiBold: require("./src/assets/fonts/InterSemiBold.ttf"), // 600
    InterBold: require("./src/assets/fonts/InterBold.ttf"), // 700
  });
  const customTextProps = {
    style: { fontFamily: "Inter" },
  };
  if (fontsIsLoaded) setCustomText(customTextProps);

  if (fontsIsLoaded) {
    return (
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <StackNavigator />
            <PushNotifications />
            <StatusBar style="dark" />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </Provider>
    );
  } else {
    return <></>;
  }
}
