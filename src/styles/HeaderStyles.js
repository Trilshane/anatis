import { StyleSheet } from "react-native";

import {
  colorAnotherBlue,
  colorBlack,
  colorCardBackground,
  colorWhite,
  containerPadding,
  fontWeightBold,
  fontWeightSemiBold,
} from "./Styles";

const styles = StyleSheet.create({
  header: {
    height: 70,
  },
  header_amount: {
    backgroundColor: colorAnotherBlue,
    borderRadius: 12,
    height: 24,
    justifyContent: "center",
    marginRight: 8,
    width: 24,
  },
  header_amountText: {
    ...fontWeightBold,
    color: colorWhite,
    fontSize: 15,
    lineHeight: 16,
    marginTop: 2,
    textAlign: "center",
  },
  header_center: {
    height: "100%",
    justifyContent: "center",
  },
  header_left: {
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: containerPadding,
    position: "absolute",
  },
  header_logo: {
    alignItems: "center",
  },
  header_right: {
    alignItems: "center",
    flexDirection: "row",
    height: "100%",
    paddingHorizontal: containerPadding,
  },
  header_rightWrapper: {
    height: "100%",
    position: "absolute",
    right: 0,
  },
  header_title: {
    ...fontWeightSemiBold,
    color: colorBlack,
    fontSize: 24,
    lineHeight: 24,
    textAlign: "center",
  },
  header_wrapper: {
    backgroundColor: colorCardBackground,
  },
});

export default styles;
