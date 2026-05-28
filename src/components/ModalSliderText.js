import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";

import { hideModalSliderText } from "../redux/actions/appActions";
import { hideModalProduct } from "../redux/actions/catalogActions";

import { FilterOrder } from "./Interface";
import styles from "../styles/Styles";
import modalStyles, {
  modalBackdropColor,
  modalBackdropOpacity,
} from "../styles/ModalStyles";
import productStyles from "../styles/ProductStyles";
import ProductAmount from "./ProductAmount";

const ModalSliderText = ({ appState, hideModalSliderText }) => {
  const insets = useSafeAreaInsets();
  const safePaddingBottom = insets.bottom;

  const modalHeight =
    Dimensions.get("window").height - 80 - insets.top - insets.bottom; // 80 - высота хидера
  const data = appState.modalSliderText;

  return (
    <Modal
      isVisible={appState.isModalSliderTextVisible}
      onBackdropPress={() => hideModalSliderText()}
      onBackButtonPress={() => hideModalSliderText()}
      style={modalStyles.modal}
      backdropColor={modalBackdropColor}
      backdropOpacity={modalBackdropOpacity}
      useNativeDriver={true}
    >
      <View
        style={{ ...modalStyles.modal_block, paddingBottom: safePaddingBottom }}
      >
        <View style={{ height: modalHeight }}>
          <View style={modalStyles.modalTop}>
            <View style={modalStyles.modalTop_close} />
          </View>

          <ScrollView>
            <View style={{ ...styles.container, paddingBottom: 40 }}>
              <View style={modalStyles.modalSliderText_imageWrapper}>
                <Image
                  source={{ uri: "https://anatis.tj" + data.PICTURE }}
                  style={modalStyles.modalSliderText_image}
                />
              </View>

              <Text style={modalStyles.modalSliderText_header}>
                {data.HEADER}
              </Text>
              <Text style={modalStyles.modalSliderText_text}>{data.TEXT}</Text>
            </View>
          </ScrollView>

          <LinearGradient
            colors={["rgba(255,255,255,1)", "rgba(255,255,255,0)"]}
            style={modalStyles.modalProduct_topGradient}
            start={[0, 0]}
            end={[0, 1]}
          />
          <LinearGradient
            colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
            style={modalStyles.modalProduct_bottomGradient}
            start={[0, 0]}
            end={[0, 1]}
          />
        </View>
      </View>
    </Modal>
  );
};

const mapDispatchToProps = {
  hideModalSliderText,
};

const mapStateToProps = (state) => {
  return {
    appState: state.app,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalSliderText);
