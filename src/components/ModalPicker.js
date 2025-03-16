import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { connect, useDispatch } from "react-redux";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";

import { hideModalPicker } from "../redux/actions/appActions";
import { modalOrderAutoCloseDelay } from "../params";

import styles from "../styles/Styles";
import modalStyles, {
  modalBackdropColor,
  modalBackdropOpacity,
} from "../styles/ModalStyles";

const ModalPicker = ({ appState, hideModalPicker }) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const safePaddingBottom = insets.bottom;

  const [pickerValue, setPickerValue] = useState("");

  const isModalPickerVisible = appState.isModalPickerVisible;
  const modalPickerList = appState.modalPickerList;
  const modalPickerValue = appState.modalPickerValue;
  const modalPickerSetValue = appState.modalPickerSetValue;

  useEffect(() => {
    setPickerValue(modalPickerValue);
  }, [modalPickerValue]);

  const handlePickerClick = (value) => {
    setPickerValue(value);
    dispatch(modalPickerSetValue(value));
    setTimeout(() => {
      hideModalPicker();
    }, modalOrderAutoCloseDelay);
  };

  return (
    <Modal
      isVisible={isModalPickerVisible}
      onBackdropPress={() => hideModalPicker()}
      onBackButtonPress={() => hideModalPicker()}
      //
      style={modalStyles.modal}
      backdropColor={modalBackdropColor}
      backdropOpacity={modalBackdropOpacity}
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
            selectedValue={pickerValue}
            onValueChange={(value) => handlePickerClick(value)}
            style={{ width: "100%", height: "auto" }}
            itemStyle={{ color: "black" }}
          >
            {modalPickerList.map((item, index) => (
              <Picker.Item
                key={`modalPicker_${index}`}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
        </View>
      </View>
    </Modal>
  );
};

const mapDispatchToProps = {
  hideModalPicker,
};

const mapStateToProps = (state) => {
  return {
    isModalPickerVisible: state.app.isModalPickerVisible,
    modalPickerList: state.app.modalPickerList,
    modalPickerValue: state.app.modalPickerValue,
    modalPickerSetValue: state.app.modalPickerSetValue,

    appState: state.app,
    orderDate: state.order.orderDate,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalPicker);
