import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";

import { addToQueue } from "../redux/actions/orderActions";

import { AmountMinus, AmountPlus } from "./Interface";
import styles from "../styles/Styles";
import productStyles from "../styles/ProductStyles";
import productAmountStyles from "../styles/ProductAmountStyles";

const ProductAmount = ({ modal, item, queue, addToQueue }) => {
  const localQuantity = queue[item.ID]?.quantity || 0;

  const handleChangeAmountButton = (action) => {
    let newQuantity = localQuantity;
    if (action === "plus") {
      newQuantity += 1;
    } else if (action === "minus") {
      if (newQuantity > 0) newQuantity -= 1;
    }
    const newItem = {
      [item.ID]: {
        id: item.ID,
        quantity: newQuantity,
        reusable: item.REUSABLE,
      },
    };
    addToQueue(newItem);
  };

  if (localQuantity > 0) {
    return (
      <>
        {!modal && (
          <Text style={productStyles.product_number}>{localQuantity} шт.</Text>
        )}
        <View style={productAmountStyles.productAmount_wrapper}>
          <View style={[styles.button, productAmountStyles.productAmount]}>
            {!modal ? (
              <Text style={productAmountStyles.productAmount_price}>
                {item.PRICE * localQuantity} сом
              </Text>
            ) : (
              <Text style={productAmountStyles.productAmount_price}>
                {localQuantity} шт.
              </Text>
            )}
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
      </>
    );
  } else {
    return (
      <>
        {!modal && (
          <Text style={productStyles.product_number}>{item.PRICE} сом</Text>
        )}
        <View style={productAmountStyles.productAmount_wrapper}>
          <TouchableOpacity
            hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}
            onPress={() => handleChangeAmountButton("plus")}
          >
            <View style={[styles.button]}>
              <Text style={[styles.button_text]}>Купить</Text>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  }
};

const mapDispatchToProps = {
  addToQueue,
};

const mapStateToProps = (state) => {
  return {
    queue: state.order.queue,
    // filterOrder: state.catalog.filterOrder,
    // filterCategories: state.catalog.filterCategories,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductAmount);
