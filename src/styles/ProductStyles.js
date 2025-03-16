import React from "react";
import { StyleSheet } from "react-native";

import {
  colorBlack,
  colorGrey,
  colorWhite,
  fontWeightMedium,
  fontWeightSemiBold,
  shadow,
} from "./Styles";

const styles = StyleSheet.create({
  product_blockCenter: {
    flexGrow: 1,
  },
  product_blockLeft: {
    // backgroundColor: 'yellow', // DELETE
    padding: 12,
  },
  product_blockRight: {
    // backgroundColor: 'yellow', // DELETE
    flex: 1,
    justifyContent: "space-between",
  },

  product_card: {
    ...shadow,
    backgroundColor: colorWhite,
    borderRadius: 16,
    marginBottom: 16, // TODO Временно?
  },

  product_data: {
    bottom: 12,
    flexDirection: "row",
    height: 15, // ?
    position: "absolute",
  },
  product_dataSep: {
    marginLeft: 16,
  },
  product_dataText: {
    ...fontWeightSemiBold,
    color: colorGrey,
    fontSize: 12,
    lineHeight: 15,
  },

  product_image: {
    height: 72,
    width: 72,
  },
  product_list: {
    marginTop: 32,
    marginBottom: 90,
  },
  product_name: {
    ...fontWeightMedium,
    color: colorBlack,
    fontSize: 14,
    height: 52, // ?
    lineHeight: 17,
    position: "absolute",
    top: 12,
  },
  product_number: {
    ...fontWeightSemiBold,
    color: colorBlack,
    fontSize: 14,
    lineHeight: 17,
    marginHorizontal: 16,
    marginTop: 12,
    textAlign: "right",
  },
  product_row: {
    flexDirection: "row",
  },

  // product_orderPrice: {
  // color: '#129409',
  // fontSize: 24,
  // fontWeight: 'bold',
  // lineHeight: 24,
  // position: 'absolute',
  // right: 12,
  // textAlign: 'right',
  // top: 62,
  // width: 150,
  // },
  // product_rowSeparator: {
  // height: 16,
  // },
});

export default styles;
