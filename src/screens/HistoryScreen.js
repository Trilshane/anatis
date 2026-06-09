import React from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { connect, useDispatch } from "react-redux";

import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

import {
  replaceQueue,
  setOrder,
  setOrderPayment,
} from "../redux/actions/orderActions";
import {
  setPaymentLink,
  setPaymentOrderId,
} from "../redux/actions/paymentActions";

import Menu from "../components/Menu";
import { ProductRow } from "../components/ProductRow";
import styles from "../styles/Styles";
import historyStyles from "../styles/HistoryStyles";
import productStyles from "../styles/ProductStyles";
import { getOrderDataFromHistory } from "../tools";

const HistoryScreen = ({ route, historyList }) => {
  const insets = useSafeAreaInsets();

  const safePaddingBottom = insets.bottom || 21;

  return (
    <View style={styles.containerFlex}>
      <ScrollView>
        <View style={{ ...styles.container, paddingBottom: safePaddingBottom }}>
          <Menu code={route?.params.code} />
          {historyList.map((item, index) => (
            <View key={`history_${index}`}>
              {/*{index === 0 ? <HistoryOrder item={item} current={true} /> : <HistoryOrder item={item} />}*/}
              <HistoryOrder item={item} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    historyList: state.history.list,
  };
};

export default connect(mapStateToProps, null)(HistoryScreen);

const HistoryOrder = ({ item, current }) => {
  return (
    <View>
      <View style={historyStyles.history_header}>
        {current ? (
          <Text style={historyStyles.history_number}>
            Текущий заказ №{item.ID}
          </Text>
        ) : (
          <Text style={historyStyles.history_number}>Заказ №{item.ID}</Text>
        )}
        <Text style={historyStyles.history_date}>от {item.DATE}</Text>
      </View>

      {current && (
        <View style={historyStyles.historyStatus}>
          <View style={historyStyles.historyStatus_line}>
            <View style={historyStyles.historyStatus_dot}>
              <Text style={historyStyles.historyStatus_value}>70</Text>
            </View>
          </View>
        </View>
      )}

      <View style={historyStyles.history_card}>
        {current ? (
          <>{/*<ProductRow amount={2} />*/}</>
        ) : (
          <>
            {item.ITEMS.map((foo, index) => {
              return (
                <View key={`historyItem_${index}`}>
                  <ProductRow item={foo} type={"history"} amount={2} />
                </View>
              );
            })}
          </>
        )}
        <HistoryOrderFooter item={item} />
      </View>
    </View>
  );
};

const HistoryOrderFooter = ({ item }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleDoPayment = () => {
    dispatch(setPaymentLink(item.PAYMENT_LINK));
    dispatch(setPaymentOrderId(item.ID));
  };

  // TODO Это очень похоже на код из FooterRepeat
  const handleRepeatOrder = () => {
    let newQueue = {};
    item["ITEMS"].map((item) => {
      newQueue[item["PRODUCT_ID"]] = {
        id: item["PRODUCT_ID"],
        quantity: item["QUANTITY"],
        reusable: item["REUSABLE"],
      };
    });
    const [newOrder, newOrderPayment] = getOrderDataFromHistory(item);

    dispatch(replaceQueue(newQueue));
    dispatch(setOrder(newOrder));
    dispatch(setOrderPayment(newOrderPayment));
    navigation.replace("Order");
  };

  return (
    <View style={historyStyles.historyFooter}>
      <View style={historyStyles.historyFooter_left}>
        <Text style={historyStyles.historyFooter_label}>Стоимость заказа:</Text>
        <View style={historyStyles.historyFooter_data}>
          <Text style={historyStyles.historyFooter_dataPrice}>
            {item.PRICE} сом.
          </Text>
          <Text style={historyStyles.historyFooter_dataAmount}>
            {item.TOTAL_BOTTLES} шт.
          </Text>
        </View>
      </View>

      <View style={historyStyles.historyFooter_right}>
        {item.PAY_SYSTEM_ID === 3 && item.PAYED === "N" ? (
          <TouchableOpacity
            hitSlop={{ top: 12, right: 16, bottom: 20, left: 12 }}
            onPress={() => handleDoPayment()}
          >
            <View style={[styles.button]}>
              <Text style={[styles.button_text]}>Оплатить</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            hitSlop={{ top: 12, right: 16, bottom: 20, left: 12 }}
            onPress={() => handleRepeatOrder()}
          >
            <View style={[styles.button]}>
              <Text style={[styles.button_text]}>Повторить</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
