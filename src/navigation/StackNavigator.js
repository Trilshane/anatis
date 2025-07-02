import { useEffect } from "react";
import { BackHandler } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
// import { Stack } from "expo-router/stack";

import CatalogScreen from "../screens/CatalogScreen";
import HistoryScreen from "../screens/HistoryScreen";
import IndexScreen from "../screens/IndexScreen";
import OrderScreen from "../screens/OrderScreen";

import { screenOptions } from "./Options";
import { navigationRef } from "../navigation/RootNavigation";

import * as Linking from "expo-linking";

const prefix = Linking.createURL("");
const success = Linking.createURL("payment_success");
const error = Linking.createURL("payment_error");
const Stack = createStackNavigator();

export default function StackNavigator() {
  const linking = {
    prefixes: [prefix, success, error, "https://secure.payler.com"],
  };

  return (
    <NavigationContainer
      linking={linking}
      ref={navigationRef}
      independent={true}
    >
      <Stack.Navigator headerMode="screen" screenOptions={screenOptions}>
        <Stack.Screen name="Index" component={IndexScreen} />
        <Stack.Screen
          name="Catalog"
          component={CatalogScreen}
          options={{ title: "Каталог" }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: "История заказов" }}
        />
        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={{ title: "Оформление заказа" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
