// import React from 'react'
import { StyleSheet } from "react-native";

import {
  colorAnotherBlue,
  colorWhite,
  containerPadding,
  fontWeightMedium,
  shadowFooter,
} from "./Styles";

const styles = StyleSheet.create({
  footer: {
    bottom: 0,
    position: "absolute",
    width: "100%",
  },
  footer_button: {
    ...shadowFooter,
    alignItems: "center",
    backgroundColor: colorAnotherBlue,
    borderRadius: 16,
    flexDirection: "row",
    height: 58,
    justifyContent: "center",
    marginBottom: containerPadding * 2,
    marginHorizontal: containerPadding * 3,
  },
  footer_text: {
    ...fontWeightMedium,
    color: colorWhite,
    fontSize: 15,
    lineHeight: 18,
    marginLeft: 13,
  },
});

export default styles;
