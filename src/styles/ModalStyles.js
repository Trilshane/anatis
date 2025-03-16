import { StyleSheet } from "react-native";

import {
  colorAnotherBlue,
  colorBlack,
  colorDarkBlue,
  colorGrey,
  colorRed,
  colorWhite,
  fontWeightBold,
  fontWeightMedium,
  fontWeightSemiBold,
} from "./Styles";
import { sliderImageHeight, sliderImageWidth } from "./IndexStyles";

export const modalBackdropColor = "#383838";
export const modalBackdropOpacity = 0.8;

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modal_backdrop: {
    backgroundColor: modalBackdropColor,
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  modal_block: {
    backgroundColor: colorWhite,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modal_header: {
    ...fontWeightSemiBold,
    color: colorBlack,
    fontSize: 24,
    lineHeight: 24,
    marginTop: 24,
  },
  modal_label: {
    ...fontWeightSemiBold,
    color: colorBlack,
    fontSize: 20,
    lineHeight: 24,
    marginTop: 24,
  },

  modalLogin_row: {
    marginTop: 15,
  },
  modalLogin_submit: {
    marginTop: 90,
  },
  modalLogin_text: {
    ...fontWeightMedium,
    color: colorBlack,
    fontSize: 15,
    lineHeight: 18,
    marginRight: 20,
    marginTop: 16,
  },
  modalLogin_textError: {
    ...fontWeightMedium,
    color: colorRed,
    fontSize: 15,
    lineHeight: 18,
    marginRight: 20,
    marginTop: 7,
  },

  modalTop: {
    alignItems: "center",
    marginTop: 12,
  },
  modalTop_close: {
    width: 80,
    height: 4,
    backgroundColor: colorGrey,
    borderRadius: 2,
  },

  modalButton: {
    borderColor: colorBlack,
    borderRadius: 8,
    borderWidth: 2,
    flex: 1,
    height: 56,
    justifyContent: "center",
  },
  modalButton_text: {
    ...fontWeightSemiBold,
    color: colorBlack,
    fontSize: 15,
    lineHeight: 18,
    textAlign: "center",
  },

  modalButtonGreen: {
    // borderColor: colorBlack,
    backgroundColor: "#129409",
    borderRadius: 8,
    // borderWidth: 2,
    flex: 1,
    height: 56,
    justifyContent: "center",
  },
  modalButtonGreen_text: {
    ...fontWeightSemiBold,
    color: colorWhite,
    fontSize: 15,
    lineHeight: 18,
    textAlign: "center",
  },

  modalFooter: {
    flexDirection: "row",
    marginTop: 70,
    marginBottom: 16,
  },
  modalFooter_sep: {
    width: 8,
  },

  modalOrder: {
    marginTop: 6,
  },
  modalOrder_row: {
    // borderColor: 'red',
    // borderWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    height: 38, // 18 + 10 + 10
    justifyContent: "space-between",
  },
  modalOrder_label: {
    ...fontWeightSemiBold,
    color: colorGrey,
    fontSize: 15,
    lineHeight: 18,
  },
  modalOrder_labelActive: {
    ...fontWeightSemiBold,
    color: colorBlack,
    fontSize: 15,
    lineHeight: 18,
  },

  modalSelect: {
    marginBottom: 8,
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 8,
  },
  modalSelect_button: {
    borderColor: colorGrey,
    borderRadius: 16,
    borderWidth: 2,
    height: 56,
    justifyContent: "center",
    marginRight: 8,
    paddingHorizontal: 24,
  },
  modalSelect_text: {
    ...fontWeightBold,
    color: colorGrey,
    fontSize: 15,
    lineHeight: 20,
    textAlign: "center",
  },

  modalSelectActive_button: {
    backgroundColor: colorAnotherBlue,
    borderColor: colorAnotherBlue,
    borderRadius: 16,
    borderWidth: 2,
    height: 56,
    justifyContent: "center",
    marginRight: 8,
    paddingHorizontal: 24,
  },
  modalSelectActive_text: {
    ...fontWeightBold,
    color: colorWhite,
    fontSize: 15,
    lineHeight: 20,
    textAlign: "center",
  },

  modalProduct_data: {
    flexDirection: "row",
    marginTop: 8,
  },
  modalProduct_dataSep: {
    marginLeft: 16,
  },
  modalProduct_dataText: {
    ...fontWeightSemiBold,
    color: colorGrey,
    fontSize: 15,
    lineHeight: 18,
  },
  modalProduct_image: {
    height: 300,
    width: 300,
  },
  modalProduct_imageWrapper: {
    alignItems: "center",
    marginTop: 46,
  },
  modalProduct_name: {
    ...fontWeightSemiBold,
    color: colorBlack,
    fontSize: 24,
    lineHeight: 24,
    marginTop: 32,
  },
  modalProduct_price: {
    flexDirection: "row",
    marginTop: 8,
  },
  modalProduct_priceAmount: {
    marginLeft: 12,
  },
  modalProduct_priceValue: {
    ...fontWeightSemiBold,
    color: colorBlack,
    fontSize: 24,
    lineHeight: 24,
    marginTop: 4,
  },
  modalProduct_detailHeader: {
    ...fontWeightSemiBold,
    color: colorBlack,
    fontSize: 20,
    lineHeight: 24,
    marginTop: 12,
  },
  modalProduct_detailText: {
    ...fontWeightMedium,
    color: colorBlack,
    fontSize: 15,
    lineHeight: 18,
    marginTop: 12,
  },

  modalSliderText_image: {
    backgroundColor: "#E0E0E1",
    borderRadius: 8,
    height: sliderImageHeight,
    width: sliderImageWidth,
  },
  modalSliderText_imageWrapper: {
    marginTop: 46,
  },
  modalSliderText_header: {
    ...fontWeightSemiBold,
    color: colorBlack,
    fontSize: 20,
    lineHeight: 24,
    marginTop: 32,
  },
  modalSliderText_text: {
    ...fontWeightMedium,
    color: colorBlack,
    fontSize: 15,
    lineHeight: 18,
    marginTop: 12,
  },

  modalProduct_bottomGradient: {
    // borderColor: 'red',
    // borderWidth: 1,
    bottom: 0,
    height: 40,
    position: "absolute",
    width: "100%",
  },
  modalProduct_topGradient: {
    // borderColor: 'red',
    // borderWidth: 1,
    top: 16,
    height: 40,
    position: "absolute",
    width: "100%",
  },
});

export default styles;
