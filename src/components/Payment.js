import React, { useEffect, useState, useRef } from "react";
import { Alert, Platform, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { connect } from "react-redux";
import { AppState } from "react-native";
import {
  hideFullscreenLoading,
  showFullscreenLoading,
} from "../redux/actions/appActions";
import {
  postCheckPayment,
  setPaymentLink,
} from "../redux/actions/paymentActions";
import { alertPaymentError, alertPostCheckPayment } from "../utils/alertUtils";
import { DEBUG_SCHEME } from "../params";

const Payment = ({
  paymentState,
  postCheckPayment,
  showFullscreenLoading,
  hideFullscreenLoading,
}) => {
  // useEffect(() => {
  //   if (paymentState.orderId !== "" && paymentState.link !== "") {
  //     console.log("Payment>useEffect>paymentState", paymentState);
  //     _openBrowserAsync(paymentState.link).then(() => {});
  //     setPaymentLink("");
  //   }
  // }, [paymentState]);

  const [currentUrl, setCurrentUrl] = useState("");

  const handleDeepLink = ({ url }) => {
    setCurrentUrl(url);
  };

  useEffect(() => {
    Linking.getInitialURL().then((url) => setCurrentUrl(url));
    const myListener = Linking.addEventListener("url", handleDeepLink);
    return () => {
      myListener.remove();
    };
  }, []);

  // const _handleRedirect = (event) => {
  //   if (Platform.OS === "ios") {
  //     WebBrowser.dismissBrowser();
  //   } else {
  //     _removeLinkingListener();
  //   }

  //   console.log("event.url", event.url);
  //   if (paymentSuccess) {
  //     setTimeout(() => {
  //       showFullscreenLoading();
  //       setTimeout(() => {
  //         hideFullscreenLoading();
  //         postCheckPayment(paymentState.orderId);
  //       }, 3000);
  //     }, 1000);
  //   } else if (paymentError) {
  //     setTimeout(() => {
  //       alertPaymentError();
  //     }, 1000);
  //   }
  // };

  // const _addLinkingListener = () => {
  //   Linking.addEventListener("url", _handleRedirect);
  // };

  // const _removeLinkingListener = () => {
  //   Linking.removeEventListener("url", _handleRedirect);
  // };

  // const _openBrowserAsync = async (link) => {
  //   try {
  //     _addLinkingListener();
  //     if (DEBUG_SCHEME) {
  //       link = "https://anatis.tj/testapi/";
  //     }
  //     let result = await WebBrowser.openBrowserAsync(link);

  //     if (Platform.OS === "ios") {
  //       _removeLinkingListener();
  //     }

  //     console.log("result", result);
  //     if (result.type === "cancel") {
  //       // TODO Тут мы руками закрыли браузер на экране оплаты, нужна реакция
  //     }
  //   } catch (error) {
  //     alert(error);
  //     console.log(error);
  //   }
  // };

  return (
    <View>
      {currentUrl == "anatis://payment_error" &&
        Alert.alert("Ошибка платежной системы")}
      {currentUrl == "anatis://payment_success" &&
        Alert.alert(
          "Заказ успешно оплачен",
          "",
          [
            {
              text: "Перейти на главную",
              onPress: () => {
                return RootNavigation.navigate("Index");
              },
            },
          ],
          { cancelable: false }
        )}
    </View>
  );
};

const mapDispatchToProps = {
  postCheckPayment,
  showFullscreenLoading,
  hideFullscreenLoading,
};

const mapStateToProps = (state) => {
  return {
    paymentState: state.payment,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
