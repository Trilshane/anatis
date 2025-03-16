import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";

import {
  hideModalOrderDate,
  setOrderDate,
} from "../redux/actions/orderActions";

import styles from "../styles/Styles";
import modalStyles from "../styles/ModalStyles";
import { modalOrderAutoCloseDelay } from "../params";

const ModalOrderDate = ({
  dateTime,
  isModalOrderDateVisible,
  orderDate,
  hideModalOrderDate,
  setOrderDate,
}) => {
  const insets = useSafeAreaInsets();
  const safePaddingBottom = insets.bottom;

  const handlePickerClick = (value) => {
    setOrderDate(value);
    setTimeout(() => {
      hideModalOrderDate();
    }, modalOrderAutoCloseDelay);
  };

  return (
    <Modal
      isVisible={isModalOrderDateVisible}
      onBackdropPress={() => hideModalOrderDate()}
      style={modalStyles.modal}
      useNativeDriver={true}
    >
      <View
        style={{ ...modalStyles.modal_block, paddingBottom: safePaddingBottom }}
      >
        <View style={styles.container}>
          <View style={modalStyles.modalTop}>
            <View style={modalStyles.modalTop_close} />
          </View>

          <Picker
            selectedValue={orderDate}
            onValueChange={(value) => handlePickerClick(value)}
          >
            {Object.keys(dateTime).map((date, index) => (
              <Picker.Item
                key={`orderDate_${index}`}
                label={date}
                value={date}
              />
            ))}
          </Picker>
        </View>
      </View>
    </Modal>
  );
};

const mapDispatchToProps = {
  hideModalOrderDate,
  setOrderDate,
};

const mapStateToProps = (state) => {
  return {
    dateTime: state.order.dateTime,
    isModalOrderDateVisible: state.order.isModalOrderDateVisible,
    orderDate: state.order.orderDate,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalOrderDate);
