import React, { useEffect } from "react";
import { LogBox, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { connect, useSelector } from "react-redux";

import { autoLogin, getSlider } from "../redux/actions/appActions";
import { getCatalog } from "../redux/actions/catalogActions";
import { getStorageData, logOut } from "../utils/appUtils";
import { DEBUG_LOGOUT } from "../params";

import FooterRepeat from "../components/FooterRepeat";
import Menu from "../components/Menu";
import ModalLoginV2 from "../components/modal/ModalLogin";
import Payment from "../components/Payment";
import ProductList from "../components/ProductList";
import Slider from "../components/Slider";

import styles from "../styles/Styles";
import indexStyles from "../styles/IndexStyles";
import ModalProduct from "../components/ModalProduct";
import ModalSliderText from "../components/ModalSliderText";

const IndexScreen = ({
  appState,
  catalogState,
  historyState,
  autoLogin,
  getCatalog,
  getSlider,
}) => {
  // Косяк redux-form. Говорят, что это безопасно
  // https://github.com/redux-form/redux-form/issues/4619
  LogBox.ignoreLogs([
    "Warning: Cannot update a component from inside the function body of a different component.",
  ]);
  // Выяснить что это и почему
  LogBox.ignoreLogs([
    "No native splash screen registered for given view controller.",
  ]);
  // Обычно тут потерянные картинки
  LogBox.ignoreLogs(["Task orphaned for request"]);

  // Debug Queue
  const queue = useSelector((state) => state.order.queue);
  useEffect(() => {
    console.log("queue", queue);
  }, [queue]);

  useEffect(() => {
    if (DEBUG_LOGOUT) {
      logOut().then(() => {});
    }
    getInitialData();
  }, []);

  const productList = catalogState.filteredList["index"];
  const sliderList = appState.slider;

  // TODO Корректный отступ, если история пуста
  const insets = useSafeAreaInsets();
  const historyList = historyState.list;
  const safePaddingBottom =
    appState.isAuth && historyList.length ? 90 : (insets.bottom || 21) - 16; // 16 из-за product_card marginBottom

  const getInitialData = () => {
    // setStorageData('phone', '+992 (11) 111-11-11')
    getStorageData("phone").then((phone) => {
      if (phone) {
        autoLogin({ phone });
      }
    });
    getCatalog();
    getSlider();
  };

  return (
    <View style={styles.containerFlex}>
      <ScrollView>
        <Slider sliderList={sliderList} />
        <View style={{ ...styles.container, paddingBottom: safePaddingBottom }}>
          <Menu />
          <Text style={indexStyles.index_header}>Популярные товары</Text>
          <View style={indexStyles.index_list}>
            <ProductList list={productList} />
          </View>
        </View>
      </ScrollView>
      <FooterRepeat />
      <ModalLoginV2 />
      <ModalSliderText />
      <ModalProduct />
      <Payment />
    </View>
  );
};

const mapDispatchToProps = {
  autoLogin,
  getCatalog,
  getSlider,
};

const mapStateToProps = (state) => {
  return {
    appState: state.app,
    catalogState: state.catalog,
    historyState: state.history,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexScreen);
