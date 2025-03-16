import React, { useEffect, useState } from "react";
import { API_URL } from "../api";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { connect, useDispatch, useSelector } from "react-redux";
// import TextInputMask from "react-native-text-input-mask";
import { Picker } from "@react-native-picker/picker";
import { Form, Field } from "react-final-form";

import {
  getDateTime,
  releaseQueue,
  postAddPromocode,
  postRemovePromocode,
  setOrder,
  setOrderDate,
  setOrderTime,
  setOrderPayment,
  postOrder,
} from "../redux/actions/orderActions";
import {
  setIsAuth,
  setModalLoginShownAtOrder,
  setModalPickerData,
  showModalLogin,
  showModalPicker,
} from "../redux/actions/appActions";
import { getCatalog } from "../redux/actions/catalogActions";
import { resetHistory } from "../redux/actions/historyActions";
import { getStorageData, logOut } from "../utils/appUtils";
import { getBasketBottlesAmount } from "../utils/orderUtils";
import {
  PHONE_MASK,
  PHONE_MASK_PLACEHOLDER,
  pickerPropsPayment,
} from "../params";

// TODO Надо деликатно выпилить ModalOrderDate и ModalOrderTime из всего проекта
import ModalOrderDate from "../components/ModalOrderDate";
import ModalOrderTime from "../components/ModalOrderTime";

import FullscreenLoading from "../components/FullscreenLoading";
import ModalPicker from "../components/ModalPicker";
import { ProductRow } from "../components/ProductRow";
import { AmountMinus, AmountPlus, OrderAddress } from "../components/Interface";
import styles, { colorGrey } from "../styles/Styles";
import orderStyles from "../styles/OrderStyles";
import productStyles from "../styles/ProductStyles";
import productAmountStyles from "../styles/ProductAmountStyles";
import { getOrderDataFromHistory } from "../tools";
import MaskInput from "react-native-mask-input";
import { navigationRef } from "../navigation/RootNavigation";
import { setDataALif } from "../redux/actions/paymentActions";

const OrderScreen = ({
  basket,
  bottlePrice,
  order,
  orderDate,
  orderTime,
  orderPayment,
  productList,
  queue,
  getDateTime,
  releaseQueue,
  setModalLoginShownAtOrder,
  showModalLogin,
  postOrder,
  appState,
  historyState,
  getCatalog,
  resetHistory,
  setIsAuth,
  handleSubmit,
  initialize,
}) => {
  const dispatch = useDispatch();
  const [priceList, setPriceList] = useState({});
  const [returnedBottles, setReturnedBottles] = useState(0);
  const [basketPrice, setBasketPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
  const [userLogin, setUserLogin] = useState(false);

  const isModalLoginVisible = appState.isModalLoginVisible;
  const historyList = historyState.list;

  // Получение данных по времени доставки и данных в случае повторения заказа
  useEffect(() => {
    getDateTime();
    getStorageData("phone").then((login) => setUserLogin(login));
    // initialize(order)
  }, []);

  useEffect(() => {
    if (historyList.length > 0) {
      const [newOrder, newOrderPayment] = getOrderDataFromHistory(
        historyList[0]
      );
      dispatch(setOrder(newOrder));
      dispatch(setOrderPayment(newOrderPayment));
    }
  }, [historyList]);

  // Обновление имени юзера после закрытия модалки логина
  useEffect(() => {
    getStorageData("phone").then((login) => setUserLogin(login));
  }, [isModalLoginVisible]);

  // Данные из очереди периодически отправляюся в корзину Битрикса
  // TODO Можно "успеть" оформить заказ раньше отправки очереди в корзину Битрикса
  useEffect(() => {
    if (Object.keys(queue).length > 0) releaseQueue(queue);
  }, [queue]);

  // Сборка локальных данных по ценами из корзины Битрикса
  useEffect(() => {
    if (basket.length) {
      let newPriceList = {};
      basket.map((item) => {
        newPriceList[item.ID] = item["DISCOUNT_PRICE"];
      });
      setPriceList(newPriceList);
    }
  }, [basket]);

  useEffect(() => {
    console.log("priceList", priceList);
    if (
      Object.keys(priceList).length > 0 &&
      appState.isModalLoginShownAtOrder === false &&
      appState.isAuth === false
    ) {
      setTimeout(() => {
        setModalLoginShownAtOrder(true);
        showModalLogin();
      }, 100);
    }
  }, [priceList]);

  // Расчёт общей стоимости заказа исходя из очереди, цен и оборотной тары
  useEffect(() => {
    let newTotalPrice = 0;

    // Базовая цена с учётом промокода
    Object.values(queue).map((item) => {
      newTotalPrice += item.quantity * priceList[item.id] || 0;
    });
    // Сохранение базовой стоимости заказа для отправки в Битрикс
    setBasketPrice(newTotalPrice);
    // Цена с учётом возвращённой тары
    const bottlesAmount = getBasketBottlesAmount(queue);
    newTotalPrice += (bottlesAmount - returnedBottles) * bottlePrice;
    if (newTotalPrice % 1 !== 0) newTotalPrice = newTotalPrice.toFixed(2);

    setTotalPrice(newTotalPrice);

    // Возвращённой тары не может быть больше, чем купленных бутылок
    if (returnedBottles > bottlesAmount) {
      setReturnedBottles(bottlesAmount);
    }
  }, [priceList, queue, returnedBottles]);

  const insets = useSafeAreaInsets();
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 + insets.top : 0; // Высота Header + insets.top
  const safePaddingBottom = insets.bottom || 21;

  const basketList = productList.filter(
    (item) =>
      item.ID &&
      Object.keys(queue).includes(item.ID.toString()) &&
      queue[item.ID].quantity > 0
  );

  const handleLoginClick = () => {
    setIsOrderSubmitted(false);
    showModalLogin();
  };

  const handleLogoutClick = () => {
    logOut().then(() => {
      setIsAuth(false);
      resetHistory();
      setModalLoginShownAtOrder(true);
      showModalLogin();
      getCatalog();
    });
  };

  const submitOrder = (values) => {
    if (isOrderSubmitted) return true;
    setIsOrderSubmitted(true);

    values.data = orderDate;
    values.time = orderTime;
    values.payment = orderPayment;

    // basketPrice + bottlesPrice = totalPrice
    // Стоимость за возвратные бутыли считается в приложении методом
    // (кол-во заказанных бутылей минус количество возвратных) * на стоимость бутыли
    // Отправляется в "bottlesPrice"
    // (с) Юра
    values.basketPrice = basketPrice;
    values.bottles = returnedBottles;
    values.bottlesPrice =
      (getBasketBottlesAmount(queue) - returnedBottles) * bottlePrice;
    values.totalPrice = totalPrice;
    console.log("submitting form", values);
    postOrder(values);
    if (values.payment == 3) {
    }
    if (values.payment == 5) {
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={styles.containerFlex}
      >
        <ScrollView>
          <View
            style={{ ...styles.container, paddingBottom: safePaddingBottom }}
          >
            <View style={productStyles.product_card}>
              {basketList.map((item, index) => (
                <View key={`order_${index}`}>
                  <ProductRow item={item} type={"catalog"} />
                </View>
              ))}
            </View>
            <ReturnedBottles
              returnedBottles={returnedBottles}
              setReturnedBottles={setReturnedBottles}
            />
            <Promocode />
            {appState.isAuth ? (
              <Text
                style={orderStyles.order_hint}
                onPress={() => handleLogoutClick()}
              >
                Вы авторизованы под аккаунтом {userLogin}.{" "}
                <Text style={orderStyles.order_hintLink}>Выйти</Text>{" "}
                из&nbsp;аккаунта
              </Text>
            ) : (
              <Text
                style={orderStyles.order_hint}
                onPress={() => handleLoginClick()}
              >
                Если вы&nbsp;ранее совершали заказ в&nbsp;приложении или
                на&nbsp;сайте,{" "}
                <Text style={orderStyles.order_hintLink}>авторизуйтесь</Text>{" "}
                под своим аккаунтом. Если это первый заказ, просто заполние все
                поля внизу:
              </Text>
            )}
            <Form
              initialValues={order}
              onSubmit={submitOrder}
              validate={validate}
              render={({ handleSubmit }) => {
                return (
                  <>
                    <Card1 />
                    <Card2 />
                    <Card3
                      handleSubmitClick={handleSubmit}
                      totalPrice={totalPrice}
                    />
                  </>
                );
              }}
            />
          </View>
        </ScrollView>
        {/*<ModalOrderDate />*/}
        {/*<ModalOrderTime />*/}
        <FullscreenLoading />
        <ModalPicker />
      </KeyboardAvoidingView>
    </>
  );
};

const Promocode = () => {
  const statePromocode = useSelector((state) => state.order.promocode);
  const [localPromocode, setLocalPromocode] = useState(statePromocode);
  const dispatch = useDispatch();

  useEffect(() => {
    setLocalPromocode(statePromocode);
  }, [statePromocode]);

  const handleAddPromocodeClick = () => {
    dispatch(postAddPromocode(localPromocode));
  };

  const handleRemovePromocodeClick = () => {
    dispatch(postRemovePromocode());
    setLocalPromocode("");
  };

  return (
    <View style={orderStyles.orderPromocode}>
      <TextInput
        autoCapitalize={"none"}
        onChangeText={(text) => setLocalPromocode(text)}
        placeholder={"Промокод"}
        placeholderTextColor={colorGrey}
        style={[styles.textInput, styles.textInput_fg]}
        value={localPromocode}
      />

      {statePromocode === "" ? (
        <TouchableOpacity
          hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}
          onPress={() => handleAddPromocodeClick()}
        >
          <View style={[styles.button, orderStyles.orderPromocode_button]}>
            <Text style={[styles.button_text]}>Применить</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}
          onPress={() => handleRemovePromocodeClick()}
        >
          <View style={[styles.button, orderStyles.orderPromocode_button]}>
            <Text style={[styles.button_text]}>Удалить</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const ReturnedBottles = ({ returnedBottles, setReturnedBottles }) => {
  const queue = useSelector((state) => state.order.queue);
  const bottlePrice = useSelector((state) => state.order.bottlePrice);

  const bottlesAmount = getBasketBottlesAmount(queue);

  const handleChangeAmountButton = (action) => {
    let newQuantity = returnedBottles;
    if (action === "plus") {
      if (newQuantity < bottlesAmount) newQuantity += 1;
    } else if (action === "minus") {
      if (newQuantity > 0) newQuantity -= 1;
    }
    setReturnedBottles(newQuantity);
  };

  return (
    <View style={orderStyles.orderBottles}>
      <View style={orderStyles.orderBottles_textWrapper}>
        <Text style={orderStyles.orderBottles_text1}>
          Сколько оборотной тары{"\n"}вы нам отдадите?
        </Text>
        <Text style={orderStyles.orderBottles_text2}>
          Залог за каждую бутыль — {bottlePrice}
          {"\xa0"}сомони
        </Text>
      </View>
      <View>
        <View style={orderStyles.orderBottles_amountWrapper}>
          <View style={[styles.button, productAmountStyles.productAmount]}>
            <Text style={productAmountStyles.productAmount_price}>
              {returnedBottles}
            </Text>
          </View>
          <TouchableOpacity
            hitSlop={{ top: 12, right: 0, bottom: 12, left: 12 }}
            onPress={() => handleChangeAmountButton("minus")}
            style={[
              productAmountStyles.productAmount_button,
              productAmountStyles.productAmount_buttonMinus,
            ]}
          >
            <AmountMinus />
          </TouchableOpacity>
          <TouchableOpacity
            hitSlop={{ top: 12, right: 12, bottom: 12, left: 0 }}
            onPress={() => handleChangeAmountButton("plus")}
            style={[
              productAmountStyles.productAmount_button,
              productAmountStyles.productAmount_buttonPlus,
            ]}
          >
            <AmountPlus />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Card1 = () => {
  return (
    <View style={orderStyles.order_card}>
      <View style={orderStyles.orderCard_title}>
        <View style={orderStyles.orderCard_titleIcon}>
          <OrderAddress />
        </View>
        <Text style={orderStyles.orderCard_titleText}>Адрес доставки</Text>
      </View>

      <View style={orderStyles.orderCard_row}>
        <Field
          name="address"
          colStyle={styles.textInput_fg}
          component={InputBlock}
          placeholder={"Адрес"}
        />
      </View>
      <View style={orderStyles.orderCard_row}>
        <Field
          name="entrance"
          colStyle={styles.textInput_col3}
          component={InputBlock}
          keyboardType={"number-pad"}
          placeholder={"Подъезд"}
        />
        <Field
          name="office"
          colStyle={styles.textInput_col3}
          component={InputBlock}
          keyboardType={"number-pad"}
          placeholder={"Квартира"}
        />
        <Field
          name="intercom"
          colStyle={styles.textInput_col3}
          component={InputBlock}
          keyboardType={"number-pad"}
          placeholder={"Код домофона"}
        />
      </View>
    </View>
  );
};

const Card2 = () => {
  const orderState = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const dateTime = orderState.dateTime;
  const orderDate = orderState.orderDate;
  const orderTime = orderState.orderTime;

  const pickerDateList = Object.keys(dateTime).map((date) => ({
    label: date,
    value: date,
  }));
  const pickerTimeList = dateTime[`${orderDate}`]
    ? dateTime[`${orderDate}`].map((time) => ({
        label: time,
        value: time,
      }))
    : [];

  const handleSetDateClick = (newValue) => {
    if (Platform.OS === "ios") {
      const list = pickerDateList;
      const value = orderDate;
      const setValue = setOrderDate;
      dispatch(setModalPickerData({ list, value, setValue }));
      dispatch(showModalPicker());
    } else {
      dispatch(setOrderDate(newValue));
    }
  };

  const handleSetTimeClick = (newValue) => {
    if (Platform.OS === "ios") {
      const list = pickerTimeList;
      const value = orderTime;
      const setValue = setOrderTime;
      dispatch(setModalPickerData({ list, value, setValue }));
      dispatch(showModalPicker());
    } else {
      dispatch(setOrderTime(newValue));
    }
  };

  return (
    <View style={orderStyles.order_card}>
      <View style={orderStyles.orderCard_title}>
        <Text style={orderStyles.orderCard_titleText}>Время доставки</Text>
      </View>
      <View style={orderStyles.orderCard_row}>
        {Platform.OS === "ios" ? (
          <TouchableOpacity
            onPress={() => handleSetDateClick()}
            style={{ ...styles.textInput, ...styles.textInput_col2 }}
          >
            <Text style={orderStyles.picker_value}>{orderDate}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.textInput_col2}>
            <TextInput
              style={{ ...styles.textInput, ...styles.textInput_col2 }}
              value={orderDate}
            />

            <Picker
              selectedValue={orderDate}
              onValueChange={(value) => handleSetDateClick(value)}
              style={orderStyles.picker_wrapper}
            >
              {pickerDateList.map((item, index) => (
                <Picker.Item
                  key={`modalPicker_${index}`}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>
        )}

        {Platform.OS === "ios" ? (
          <TouchableOpacity
            onPress={() => handleSetTimeClick()}
            style={{ ...styles.textInput, ...styles.textInput_col2 }}
          >
            <Text style={orderStyles.picker_value}>{orderTime}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.textInput_col2}>
            <TextInput
              style={{ ...styles.textInput, ...styles.textInput_col2 }}
              value={orderTime}
            />

            <Picker
              selectedValue={orderTime}
              onValueChange={(value) => handleSetTimeClick(value)}
              style={orderStyles.picker_wrapper}
            >
              {pickerTimeList.map((item, index) => (
                <Picker.Item
                  key={`modalPicker_${index}`}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>
        )}

        {/*<InputBlock placeholder={'с 9:00 до 13:00'} colStyle={styles.textInput_col2} />*/}
      </View>
    </View>
  );
};

const Card3 = ({ totalPrice, handleSubmitClick }) => {
  const payment = useSelector((state) => state.payment.dataAlif);
  const orderPayment = useSelector((state) => state.order.orderPayment);
  const [order, setOrder] = useState(false);
  const [paymentValue, setPaymentValue] = useState("");
  const [reusable, setReusable] = useState(false);
  const [orderPaymentLabel, setOrderPaymentLabel] = useState("");
  const dispatch = useDispatch();
  console.log("orderPayment", orderPayment);
  useEffect(() => {}, [handleSubmitClick]);

  // const orderPaymentLabel = pickerPropsPayment.filter(
  //   (paymentItem) => paymentItem.value === orderPayment
  // ).label;

  useEffect(() => {
    setOrderPaymentLabel(
      pickerPropsPayment.filter(
        (paymentItem) => paymentItem.value == orderPayment
      )[0]
    );
    console.log("orderPaymentLabel", orderPaymentLabel);
  }, ["", orderPayment]);
  useEffect(() => {
    const orderArray = Object.values(queue);
    for (let i = 0; i < orderArray.length; i++) {
      if (orderArray[i]["quantity"] !== 0 && orderArray[i]["reusable"]) {
        setReusable(true);
        break;
      }
    }
  }, ["", queue]);

  const queue = useSelector((state) => state.order.queue);

  useEffect(() => {
    const orderArray = Object.values(queue);
    for (let i = 0; i < orderArray.length; i++) {
      if (orderArray[i]["quantity"] !== 0 && orderArray[i]["reusable"]) {
        setReusable(true);
        break;
      }
    }
  }, ["", queue]);

  const handleAlifPayment = () => {
    const dataObj = {
      key: paymentValue.key ? paymentValue.key : "",
      token: paymentValue.token ? paymentValue.token : "",
      callbackUrl: paymentValue.callbackUrl ? paymentValue.callbackUrl : "",
      returnUrl: paymentValue.returnUrl ? paymentValue.returnUrl : "",
      amount: paymentValue.amount ? paymentValue.amount : "",
      orderId: paymentValue.orderId ? paymentValue.orderId : "",
      gate: paymentValue.gate ? paymentValue.gate : "",
      info: paymentValue.info ? paymentValue.info : "",
      email: paymentValue.email ? paymentValue.email : "",
      phone: paymentValue.phone ? paymentValue.phone : "",
    };

    const getParams = `?key=${dataObj["key"]}&token=${dataObj["token"]}&callbackUrl=${dataObj["callbackUrl"]}&returnUrl=${dataObj["returnUrl"]}&amount=${dataObj["amount"]}&orderId=${dataObj["orderId"]}&gate=${dataObj["gate"]}&info=${dataObj["info"]}&email=${dataObj["email"]}&phone=${dataObj["phone"]}`;
    const alifRidirect = "/order/alifPaymentRedirect.php";
    setOrder(false);

    Linking.openURL(API_URL + alifRidirect + getParams);
  };

  useEffect(() => {
    dispatch(setDataALif(payment));
  }, [setDataALif]);

  useEffect(() => {
    if (order) {
      setPaymentValue(payment);
      console.log("paymentValue paymentValue paymentValue", paymentValue);
      if (paymentValue && orderPayment == 5) {
        handleAlifPayment();
      }
    }
  }, [payment, paymentValue]);

  const handleSetPaymentClick = (newValue) => {
    if (Platform.OS === "ios") {
      const list = pickerPropsPayment;
      const value = orderPayment;
      const setValue = setOrderPayment;
      dispatch(setModalPickerData({ list, value, setValue }));
      dispatch(showModalPicker());
    } else {
      dispatch(setOrderPayment(newValue));
    }
  };

  return (
    <View style={orderStyles.order_card}>
      <View style={orderStyles.orderCard_title}>
        <Text style={orderStyles.orderCard_titleText}>Персональные данные</Text>
      </View>
      <View style={orderStyles.orderCard_row}>
        <Field
          name="name"
          colStyle={styles.textInput_fg}
          component={InputBlock}
          placeholder={"Имя"}
        />
      </View>
      <View style={orderStyles.orderCard_row}>
        <Field
          name="phone"
          colStyle={styles.textInput_fg}
          component={InputPhoneBlock}
        />
      </View>
      <View style={orderStyles.orderCard_row}>
        {Platform.OS === "ios" ? (
          <TouchableOpacity
            onPress={(value) => handleSetPaymentClick(value)}
            style={{ ...styles.textInput, ...styles.textInput_fg }}
          >
            <Text style={orderStyles.picker_value}>
              {orderPaymentLabel["label"]}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.textInput_fg}>
            <TextInput
              style={{ ...styles.textInput, ...styles.textInput_fg }}
              value={orderPaymentLabel["label"]}
            />
            <Picker
              selectedValue={orderPayment}
              onValueChange={(value) => handleSetPaymentClick(value)}
              style={orderStyles.picker_wrapper}
            >
              {pickerPropsPayment.map((item, index) => (
                <Picker.Item
                  key={`modalPicker_${index}`}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>
        )}
      </View>
      <View style={orderStyles.orderCard_row}>
        <Field
          name="comment"
          colStyle={styles.textInput_fg}
          component={InputBlock}
          placeholder={"Комментарий"}
        />
      </View>
      <View style={orderStyles.orderPrice}>
        <Text style={orderStyles.orderPrice_label}>Общая сумма:</Text>
        <Text style={orderStyles.orderPrice_value}>{totalPrice} сом</Text>
      </View>

      <View style={orderStyles.order_submit}>
        <TouchableOpacity
          onPress={() => {
            if (totalPrice >= 100 || reusable) {
              handleSubmitClick();
              setOrder(true);
            } else {
              Alert.alert(
                "Заказ должен быть больше 100 сом., либо с бутылью 19л"
              );
            }
          }}
          style={styles.buttonGreen}
        >
          <Text style={styles.buttonGreen_text}>Оформить заказ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const InputBlock = ({
  autoCapitalize,
  colStyle,
  keyboardType,
  placeholder,
  input,
  meta,
}) => {
  let style = [styles.textInput, colStyle];
  // if (touched && error) style.push(styles.textInput_error)
  if (meta.touched && meta.error) style.push(styles.textInput_error);

  return (
    <>
      <TextInput
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={colorGrey}
        style={style}
        {...input}
      />
      {/*{touched && ((error && <Text>E {error}</Text>) || (warning && <Text>W {warning}</Text>))}*/}
      {/*{meta.error && meta.touched && <Text>{meta.error}</Text>}*/}
    </>
  );
};

const InputPhoneBlock = ({ colStyle, input, meta }) => {
  let style = [styles.textInput, colStyle];
  // if (touched && error) style.push(styles.textInput_error)
  if (meta.touched && meta.error) style.push(styles.textInput_error);

  return (
    <>
      <MaskInput
        keyboardType={"phone-pad"}
        mask={PHONE_MASK}
        placeholder={PHONE_MASK_PLACEHOLDER}
        placeholderTextColor={colorGrey}
        style={style}
        {...input}
      />
      {/*{touched && ((error && <Text>E {error}</Text>) || (warning && <Text>W {warning}</Text>))}*/}
      {/*{meta.error && meta.touched && <Text>{meta.error}</Text>}*/}
    </>
  );
};

const validate = (values) => {
  const errors = {};

  if (!values.address) {
    errors.address = "Required";
  }

  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.phone) {
    errors.phone = "Required";
  } else {
    if (values.phone.length < 19) {
      errors.phone = "Invalid phone number";
    }
  }

  return errors;
};

const mapDispatchToProps = {
  getCatalog,
  getDateTime,
  postOrder,
  releaseQueue,
  resetHistory,
  setModalLoginShownAtOrder,
  showModalLogin,
  setIsAuth,
};

const mapStateToProps = (state) => {
  return {
    // TODO Надо привести это безобразие к виду appState. Не забыть, в сигнатурие OrderScreen сделать то же самое
    appState: state.app,
    historyState: state.history,
    basket: state.order.basket,
    bottlePrice: state.order.bottlePrice,
    order: state.order.order,
    orderDate: state.order.orderDate,
    orderTime: state.order.orderTime,
    orderPayment: state.order.orderPayment,
    productList: state.catalog.list,
    queue: state.order.queue,
  };
};

// const ConnectedOrderScreen = connect(mapStateToProps, mapDispatchToProps)(OrderScreen)
export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);

// export default reduxForm({
//   form: 'orderForm',
//   validate,
// })(ConnectedOrderScreen)
