import React from "react";
import { StyleSheet } from "react-native";

import {
  colorBlack,
  colorGreen,
  containerPadding,
  fontWeightSemiBold,
} from "./Styles";

const styles = StyleSheet.create({
  productAmount: {
    borderColor: colorGreen,
    // paddingHorizontal: 31,
    width: 104,
    alignItems: "center",
  },
  productAmount_button: {
    height: "100%",
    justifyContent: "center",
    position: "absolute",
    width: "50%",
  },
  productAmount_buttonMinus: {
    paddingLeft: 12,
  },
  productAmount_buttonPlus: {
    alignItems: "flex-end",
    paddingRight: 12,
    right: 0,
  },
  productAmount_price: {
    ...fontWeightSemiBold,
    color: colorBlack,
    fontSize: 12,
    lineHeight: 15,
  },
  productAmount_wrapper: {
    marginBottom: 12,
    marginHorizontal: 12,
  },
});

export default styles;
