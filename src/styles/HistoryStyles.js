import { StyleSheet } from "react-native";

import {
  colorAnotherBlue,
  colorBlack,
  colorBlue,
  colorGrey,
  colorWhite,
  fontWeightBold,
  fontWeightSemiBold,
  shadow,
  shadowLight,
} from "./Styles";

const styles = StyleSheet.create({
  history_card: {
    ...shadowLight,
    backgroundColor: colorWhite,
    borderRadius: 16,
    marginTop: 16,
  },

  history_date: {
    ...fontWeightSemiBold,
    color: colorBlack,
    fontSize: 12,
    lineHeight: 15,
    marginTop: 7,
  },
  history_header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
  },
  history_number: {
    ...fontWeightSemiBold,
    color: colorBlack,
    fontSize: 20,
    lineHeight: 24,
  },

  historyFooter: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  historyFooter_data: {
    alignItems: "flex-end",
    flexDirection: "row",
    marginTop: 4,
  },
  historyFooter_dataAmount: {
    color: colorGrey,
    fontSize: 12,
    lineHeight: 15,
    marginLeft: 12,
    marginBottom: 2,
  },
  historyFooter_dataPrice: {
    ...fontWeightSemiBold,
    color: colorBlack,
    fontSize: 20,
    lineHeight: 24,
  },
  historyFooter_label: {
    ...fontWeightSemiBold,
    color: colorBlack,
    fontSize: 15,
    lineHeight: 18,
  },
  historyFooter_left: {
    marginLeft: 16,
    marginBottom: 16,
  },
  historyFooter_right: {
    marginBottom: 20,
    marginRight: 16,
  },

  historyStatus: {
    ...shadowLight,
    backgroundColor: colorWhite,
    borderRadius: 21,
    height: 41,
    marginBottom: 8,
    marginTop: 16,
  },
  historyStatus_line: {
    backgroundColor: colorBlue,
    borderRadius: 21,
    height: 41,
    width: "70%",
  },
  historyStatus_dot: {
    backgroundColor: colorAnotherBlue,
    borderRadius: 21,
    height: 37,
    justifyContent: "center",
    position: "absolute",
    right: 2,
    top: 2,
    width: 37,
  },
  historyStatus_value: {
    ...fontWeightBold,
    color: colorWhite,
    fontSize: 15,
    lineHeight: 19,
    textAlign: "center",
  },
});

export default styles;
