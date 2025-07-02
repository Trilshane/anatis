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
// С этими пропсами хэдэр не отображался
// export default Header = ({
//   insets,
//   navigation,
//   previous,
//   scene,
// }) => {

export default Header = ({ navigation, route, progress, options }) => {
  // const isAuth = useSelector((state) => state.app.isAuth);
  const queue = useSelector((state) => state.order.queue);
  const headerOrderFadeAnim = useRef(new Animated.Value(0)).current;

  // const { options } = scene.descriptor;

  // const title =
  //   options.headerTitle !== undefined
  //     ? options.headerTitle
  //     : options.title !== undefined
  //     ? options.title
  //     : scene.route.name;

  // console.log(`Имя - ${scene.route.name}`);
  const basketAmount = getBasketAmount(queue);

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
  // Закомментил Димин код, и переписал вывод хедера с новыми условиями
  //   return (
  //     // <View style={{ ...headerStyles.header_wrapper, paddingTop: insets.top }}>
  //     <View style={{ ...headerStyles.header_wrapper }}>
  //       <View style={headerStyles.header}>
  //         {previous ? (
  //           <View style={headerStyles.header_center}>
  //             <Text style={headerStyles.header_title}>{title}</Text>
  //           </View>
  //         ) : (
  //           <View style={headerStyles.header_logo}>
  //             <Image source={require("../assets/images/logo.png")} />
  //           </View>
  //         )}

  //         {previous && (
  //           <TouchableOpacity
  //             onPress={navigation.goBack}
  //             style={headerStyles.header_left}
  //           >
  //             <HeaderBackIcon />
  //           </TouchableOpacity>
  //         )}

  //         {/*{scene.route.name !== 'Order' && isAuth && (*/}
  //         {scene.route.name !== "Order" && (
  //           <TouchableOpacity
  //             onPress={() => handleOrderButtonClick()}
  //             style={headerStyles.header_rightWrapper}
  //           >
  //             <Animated.View
  //               style={{
  //                 ...headerStyles.header_right,
  //                 opacity: headerOrderFadeAnim,
  //               }}
  //             >
  //               <View style={headerStyles.header_amount}>
  //                 {basketAmount > 0 ? (
  //                   <Text style={headerStyles.header_amountText}>
  //                     {basketAmount}
  //                   </Text>
  //                 ) : (
  //                   <Text style={headerStyles.header_amountText}>1</Text>
  //                 )}
  //               </View>
  //               <HeaderCartIcon />
  //             </Animated.View>
  //           </TouchableOpacity>
  //         )}
  //       </View>
  //     </View>
  //   );
  // };

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
        {progress.previous ? (
          <View style={headerStyles.header_center}>
            <Text style={headerStyles.header_title}>{options.title}</Text>
          </View>
        ) : (
          <View style={headerStyles.header_logo}>
            <Image source={require("../assets/images/logo.png")} />
          </View>
        )}

        {progress.previous && (
          <TouchableOpacity
            onPress={navigation.goBack}
            style={headerStyles.header_left}
          >
            <HeaderBackIcon />
          </TouchableOpacity>
        )}

        {/*{scene.route.name !== 'Order' && isAuth && (*/}
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
