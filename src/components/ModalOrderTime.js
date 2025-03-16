import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";

import {
  hideModalOrderTime,
  setOrderTime,
} from "../redux/actions/orderActions";

import styles from "../styles/Styles";
import modalStyles from "../styles/ModalStyles";

const ModalOrderTime = ({
  dateTime,
  isModalOrderTimeVisible,
  orderDate,
  orderTime,
  hideModalOrderTime,
  setOrderTime,
}) => {
  const insets = useSafeAreaInsets();
  const safePaddingBottom = insets.bottom;

  const handlePickerClick = (value) => {
    setOrderTime(value);
    setTimeout(() => {
      hideModalOrderTime();
    }, modalOrderAutoCloseDelay);
  };

  return (
    <Modal
      isVisible={isModalOrderTimeVisible}
      onBackdropPress={() => hideModalOrderTime()}
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
            selectedValue={orderTime}
            onValueChange={(value) => handlePickerClick(value)}
          >
            {dateTime[`${orderDate}`]?.map((time, index) => (
              <Picker.Item
                key={`orderTime_${index}`}
                label={time}
                value={time}
              />
            ))}
          </Picker>
        </View>
      </View>
    </Modal>
  );
};

const mapDispatchToProps = {
  hideModalOrderTime,
  setOrderTime,
};

const mapStateToProps = (state) => {
  return {
    dateTime: state.order.dateTime,
    isModalOrderTimeVisible: state.order.isModalOrderTimeVisible,
    orderDate: state.order.orderDate,
    orderTime: state.order.orderTime,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalOrderTime);
