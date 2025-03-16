import { Alert } from "react-native";

import * as RootNavigation from "../navigation/RootNavigation";

export const alertAddPromocode = (promocode) => {
  Alert.alert(`Промокод ${promocode} применён`);
};

export const alertPaymentError = () => {
  Alert.alert("Ошибка платёжной системы");
};

export const alertRemovePromocode = () => {
  Alert.alert(`Промокод удалён`);
};

export const alertPostCheckPayment = ({ navigation }) => {
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
  );
};

export const alertPostOrder = () => {
  Alert.alert(
    "Заказ успешно оформлен",
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
  );
};
