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

import { hideModalProduct } from "../redux/actions/catalogActions";

import { FilterOrder } from "./Interface";
import styles from "../styles/Styles";
import modalStyles, {
  modalBackdropColor,
  modalBackdropOpacity,
} from "../styles/ModalStyles";
import productStyles from "../styles/ProductStyles";
import ProductAmount from "./ProductAmount";

const ModalProduct = ({ catalogState, hideModalProduct }) => {
  const insets = useSafeAreaInsets();
  const safePaddingBottom = insets.bottom;

  const modalHeight =
    Dimensions.get("window").height - 80 - insets.top - insets.bottom; // 80 - высота хидера
  const product = catalogState.modalProduct;

  return (
    <Modal
      isVisible={catalogState.isModalProductVisible}
      onBackdropPress={() => hideModalProduct()}
      onBackButtonPress={() => hideModalProduct()}
      //
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
              <View style={modalStyles.modalProduct_imageWrapper}>
                <Image
                  source={{ uri: "https://anatis.tj" + product.DETAIL_PICTURE }}
                  style={modalStyles.modalProduct_image}
                />
              </View>

              <Text style={modalStyles.modalProduct_name}>{product.NAME}</Text>

              <View style={modalStyles.modalProduct_data}>
                <Text style={modalStyles.modalProduct_dataText}>
                  {product.VOLUME}
                </Text>
                <View style={modalStyles.modalProduct_dataSep} />
                <Text style={modalStyles.modalProduct_dataText}>
                  {product.TARA}
                </Text>
              </View>

              <View style={modalStyles.modalProduct_price}>
                <Text style={modalStyles.modalProduct_priceValue}>
                  {product.PRICE} сом
                </Text>
                <View style={modalStyles.modalProduct_priceAmount}>
                  <ProductAmount modal={true} item={product} />
                </View>
              </View>

              {product.DETAIL_TEXT !== "" && (
                <>
                  <Text style={modalStyles.modalProduct_detailHeader}>
                    Описание
                  </Text>
                  <Text style={modalStyles.modalProduct_detailText}>
                    {product.DETAIL_TEXT}
                  </Text>
                </>
              )}
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
            // colors={['red', 'rgba(255,255,255,1)']}
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
  // setFilterOrder,
  // setFilterCategories,
  // resetFilter,
  hideModalProduct,
};

const mapStateToProps = (state) => {
  return {
    catalogState: state.catalog,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalProduct);
