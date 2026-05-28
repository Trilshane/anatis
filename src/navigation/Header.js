import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Platform,
  StatusBar,
} from "react-native";
import { connect, useSelector } from "react-redux";
import Constants from "expo-constants";

import { getBasketAmount } from "../utils/orderUtils";
import { headerOrderFadeDelay } from "../params";

import { HeaderBackIcon, HeaderCartIcon } from "../components/Interface";
import headerStyles from "../styles/HeaderStyles";
import { AnimationFadeIn, AnimationFadeOut } from "../animations";

export default Header = ({ navigation, route, options }) => {
  const queue = useSelector((state) => state.order.queue);
  const headerOrderFadeAnim = useRef(new Animated.Value(0)).current;

  const basketAmount = getBasketAmount(queue);
  const hasPrevious = navigation.canGoBack();

  useEffect(() => {
    if (basketAmount) {
      AnimationFadeIn(headerOrderFadeAnim, headerOrderFadeDelay);
    } else {
      AnimationFadeOut(headerOrderFadeAnim, headerOrderFadeDelay);
    }
  }, [basketAmount]);

  const handleOrderButtonClick = () => {
    // У нас строго два уровня в стек навигаторе
    // В Menu.js примерно то же самое
    if (route.name === "Index") {
      navigation.push("Order");
    } else {
      navigation.replace("Order");
    }
  };

  return (
    <View
      style={{
        ...headerStyles.header_wrapper,
        paddingTop:
          Platform.OS == "android"
            ? StatusBar.currentHeight
            : Constants.statusBarHeight,
      }}
    >
      <View style={headerStyles.header}>
        {hasPrevious ? (
          <View style={headerStyles.header_center}>
            <Text style={headerStyles.header_title}>{options.title}</Text>
          </View>
        ) : (
          <View style={headerStyles.header_logo}>
            <Image source={require("../assets/images/logo.png")} />
          </View>
        )}

        {hasPrevious && (
          <TouchableOpacity
            onPress={navigation.goBack}
            style={headerStyles.header_left}
          >
            <HeaderBackIcon />
          </TouchableOpacity>
        )}

        {route.name !== "Order" && (
          <TouchableOpacity
            onPress={() => handleOrderButtonClick()}
            style={headerStyles.header_rightWrapper}
          >
            <Animated.View
              style={{
                ...headerStyles.header_right,
                opacity: headerOrderFadeAnim,
              }}
            >
              <View style={headerStyles.header_amount}>
                {basketAmount > 0 ? (
                  <Text style={headerStyles.header_amountText}>
                    {basketAmount}
                  </Text>
                ) : (
                  <Text style={headerStyles.header_amountText}>1</Text>
                )}
              </View>
              <HeaderCartIcon />
            </Animated.View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
