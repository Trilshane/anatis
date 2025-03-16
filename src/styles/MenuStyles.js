import { StyleSheet } from "react-native";

import {
  colorAnotherBlue,
  colorBlack,
  colorDarkBlue,
  colorWhite,
  containerPadding,
  dimWidth,
  fontWeightSemiBold,
  shadow,
} from "./Styles";

const menuItemSize = (dimWidth - 2 * containerPadding) / 4 - (18 * 3) / 4;

const styles = StyleSheet.create({
  menu_icon: {
    ...shadow,
    alignItems: "center",
    backgroundColor: colorWhite,
    borderRadius: menuItemSize / 2,
    elevation: 0,
    height: menuItemSize,
    justifyContent: "center",
    width: menuItemSize,
  },
  menu_iconActive: {
    backgroundColor: colorAnotherBlue,
    borderColor: colorWhite,
    borderWidth: 1,
  },
  menu_iconLogin: {
    backgroundColor: colorDarkBlue,
    borderColor: colorWhite,
    borderWidth: 1,
  },
  menu_item: {
    width: menuItemSize,
  },
  menu_list: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },
  menu_name: {
    ...fontWeightSemiBold,
    color: colorBlack,
    fontSize: 12,
    lineHeight: 15,
    marginTop: 12,
    textAlign: "center",
  },
});

export default styles;
