import { StyleSheet } from "react-native";

import {
  colorAnotherBlue,
  colorBlack,
  colorWhite,
  containerPadding,
  dimWidth,
  fontWeightSemiBold,
} from "./Styles";

export const sliderImageWidth = dimWidth - 2 * containerPadding;
export const sliderImageHeight = sliderImageWidth / 1.88;
export const sliderInterval = sliderImageWidth + containerPadding / 2;

const styles = StyleSheet.create({
  index_header: {
    ...fontWeightSemiBold,
    color: colorBlack,
    fontSize: 20,
    lineHeight: 24,
    marginTop: 32,
  },
  index_list: {
    marginTop: 16,
  },

  sliderDot: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
    marginTop: 16,
    height: 6,
  },
  sliderDot_item: {
    backgroundColor: "#E0E0E1",
    borderRadius: 3,
    height: 6,
    marginHorizontal: 4,
    width: 6,
  },
  sliderDot_itemActive: {
    backgroundColor: colorAnotherBlue,
  },
  sliderImages: {
    height: sliderImageHeight,
    paddingLeft: containerPadding,
    paddingRight: containerPadding / 2,
  },
  sliderImages_item: {
    backgroundColor: colorWhite,
    borderRadius: 8,
    height: sliderImageHeight,
    marginRight: containerPadding / 2,
    width: sliderImageWidth,
  },
});

export default styles;
