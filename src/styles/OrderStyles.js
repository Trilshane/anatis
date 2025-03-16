import { StyleSheet } from "react-native";

import {
  colorBlack,
  colorGreen,
  colorGrey,
  colorWhite,
  containerPadding,
  fontWeightMedium,
  fontWeightSemiBold,
  shadowLight,
} from "./Styles";

const styles = StyleSheet.create({
  order_card: {
    ...shadowLight,
    backgroundColor: colorWhite,
    borderRadius: 16,
    marginTop: 20,
    padding: containerPadding,
  },
  order_hint: {
    ...fontWeightMedium,
    color: colorBlack,
    fontSize: 15,
    lineHeight: 18,
    marginRight: 50,
    marginTop: 22,
  },
  order_hintLink: {
    color: colorGreen,
  },
  order_submit: {
    marginTop: 24,
  },

  orderBottles: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  orderBottles_amountWrapper: {
    marginRight: 8,
  },
  orderBottles_text1: {
    ...fontWeightMedium,
    color: colorBlack,
    fontSize: 15,
    lineHeight: 18,
  },
  orderBottles_text2: {
    ...fontWeightSemiBold,
    color: colorBlack,
    fontSize: 12,
    lineHeight: 15,
    marginTop: 8,
  },
  orderBottles_textWrapper: {
    flex: 1,
    flexGrow: 1,
  },

  orderCard_row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    marginTop: 10,
  },
  orderCard_title: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 4,
  },
  orderCard_titleIcon: {
    marginRight: 6,
    left: -2,
  },
  orderCard_titleText: {
    ...fontWeightMedium,
    color: colorBlack,
    fontSize: 20,
    lineHeight: 24,
  },

  orderPrice: {
    flexDirection: "row",
    marginTop: 18,
  },
  orderPrice_label: {
    ...fontWeightSemiBold,
    color: colorBlack,
    fontSize: 15,
    lineHeight: 18,
  },
  orderPrice_value: {
    ...fontWeightSemiBold,
    color: colorBlack,
    fontSize: 15,
    lineHeight: 18,
    marginLeft: 12,
  },

  orderPromocode: {
    flexDirection: "row",
    marginRight: 8,
    marginTop: 18,
  },
  orderPromocode_button: {
    marginLeft: 34,
    paddingHorizontal: 0,
    width: 104,
  },

  picker_value: {
    ...fontWeightSemiBold,
    color: colorGrey,
    fontSize: 15,
    lineHeight: 18,
  },
  picker_wrapper: {
    bottom: 0,
    left: 0,
    opacity: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
});

export default styles;
