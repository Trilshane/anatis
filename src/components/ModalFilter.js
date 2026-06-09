import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { connect } from "react-redux";
import Modal from "react-native-modal";

import {
  setFilterOrder,
  setFilterCategories,
  hideModalFilter,
  resetFilter,
} from "../redux/actions/catalogActions";

import { FilterOrder } from "./Interface";
import styles from "../styles/Styles";
import modalStyles, {
  modalBackdropColor,
  modalBackdropOpacity,
} from "../styles/ModalStyles";

const ModalFilter = ({
  hideModalFilter,
  setFilterOrder,
  setFilterCategories,
  resetFilter,
  filterList,
  isModalFilterVisible,
}) => {
  const [selectList, setSelectList] = useState([]);
  const [orderBy, setOrderBy] = useState("");

  const insets = useSafeAreaInsets();
  const safePaddingBottom = insets.bottom;

  const handleOrderButton = (value) => {
    if (value !== orderBy) {
      setOrderBy(value);
    } else {
      setOrderBy("");
    }
  };

  const handleResetButton = () => {
    setOrderBy("");
    setSelectList([]);
    resetFilter();
    hideModalFilter();
  };

  const handleSelectButton = (action, value) => {
    if (action == "add") {
      setSelectList((prevState) => {
        return [...prevState, value];
      });
    } else if (action == "remove") {
      setSelectList((prevState) => {
        return [...prevState.filter((item) => item != value)];
      });
    }
  };

  const handleSubmitButton = () => {
    setFilterOrder(orderBy);
    setFilterCategories(selectList);
    hideModalFilter();
  };

  return (
    <Modal
      isVisible={isModalFilterVisible}
      onBackdropPress={() => hideModalFilter()}
      onBackButtonPress={() => hideModalFilter()}
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
          <Text style={modalStyles.modal_header}>Фильтровать</Text>
          <Text style={modalStyles.modal_label}>Объем</Text>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={modalStyles.modalSelect}
        >
          {filterList.map((item, index) =>
            selectList.includes(item) ? (
              <TouchableOpacity
                key={`modalFilter_${index}`}
                onPress={() => handleSelectButton("remove", item)}
                style={modalStyles.modalSelectActive_button}
              >
                <Text style={modalStyles.modalSelectActive_text}>{item}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                key={`modalFilter_${index}`}
                onPress={() => handleSelectButton("add", item)}
                style={modalStyles.modalSelect_button}
              >
                <Text style={modalStyles.modalSelect_text}>{item}</Text>
              </TouchableOpacity>
            ),
          )}
        </ScrollView>

        <View style={styles.container}>
          <Text style={modalStyles.modal_label}>Сортировка по цене</Text>

          <View style={modalStyles.modalOrder}>
            <TouchableOpacity
              onPress={() => handleOrderButton("price_asc")}
              style={modalStyles.modalOrder_row}
            >
              <Text
                style={
                  orderBy === "price_asc"
                    ? modalStyles.modalOrder_labelActive
                    : modalStyles.modalOrder_label
                }
              >
                По возрастанию
              </Text>
              {orderBy === "price_asc" && <FilterOrder />}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleOrderButton("price_desc")}
              style={modalStyles.modalOrder_row}
            >
              <Text
                style={
                  orderBy === "price_desc"
                    ? modalStyles.modalOrder_labelActive
                    : modalStyles.modalOrder_label
                }
              >
                По убыванию
              </Text>
              {orderBy === "price_desc" && <FilterOrder />}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleOrderButton("rating")}
              style={modalStyles.modalOrder_row}
            >
              <Text
                style={
                  orderBy === "rating"
                    ? modalStyles.modalOrder_labelActive
                    : modalStyles.modalOrder_label
                }
              >
                По популярности
              </Text>
              {orderBy === "rating" && <FilterOrder />}
            </TouchableOpacity>
          </View>

          <View style={modalStyles.modalFooter}>
            <TouchableOpacity
              onPress={() => handleResetButton()}
              style={[modalStyles.modalButton]}
            >
              <Text style={[modalStyles.modalButton_text]}>Сбросить</Text>
            </TouchableOpacity>
            <View style={modalStyles.modalFooter_sep} />
            <TouchableOpacity
              onPress={() => handleSubmitButton()}
              style={[modalStyles.modalButtonGreen]}
            >
              <Text style={[modalStyles.modalButtonGreen_text]}>Применить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const mapDispatchToProps = {
  setFilterOrder,
  setFilterCategories,
  resetFilter,
  hideModalFilter,
};

const mapStateToProps = (state) => {
  return {
    isModalFilterVisible: state.catalog.isModalFilterVisible,
    filterList: state.catalog.filterList,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalFilter);
