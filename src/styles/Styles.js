import { Dimensions, Platform, StyleSheet } from "react-native";

export const containerPadding = 16;
export const dimWidth = Dimensions.get("window").width;

export const colorCardBackground = "#F2F8FC";

export const colorBlack = "#0E2B45";
export const colorGreen = "#129409";
export const colorGrey = "#878F97";
export const colorLightGrey = "#DADADA";
export const colorWhite = "#FFFFFF";
export const colorRed = "#EB5757";

export const colorBlue = "#6CD7FF";
export const colorDarkBlue = "#2FC4FF";
export const colorAnotherBlue = "#2D9CDB";

export const fontWeightMedium = { fontFamily: "InterMedium" }; // 500
export const fontWeightSemiBold = { fontFamily: "InterSemiBold" }; // 600
export const fontWeightBold = { fontFamily: "InterBold" }; // 700

export const shadow = {
  shadowColor: "rgba(66, 95, 138, 0.05)",
  shadowOffset: { height: 16, width: 0 },
  shadowOpacity: 1.0,
  shadowRadius: 16,
  elevation: 8,
};
export const shadowFooter = {
  shadowColor: "rgba(15, 119, 160, 0.3)",
  shadowOffset: { height: 4, width: 0 },
  shadowOpacity: 1.0,
  shadowRadius: 24,
  elevation: 8,
};
export const shadowLight = {
  shadowColor: "rgba(0, 0, 0, 0.05)",
  shadowOffset: { height: 8, width: 0 },
  shadowOpacity: 1.0,
  shadowRadius: 32,
  elevation: 32,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: containerPadding,
  },
  containerFlex: {
    flex: 1,
  },

  button: {
    backgroundColor: colorWhite,
    borderColor: colorBlack,
    borderRadius: 8,
    borderWidth: 2,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 17,
  },
  button_text: {
    ...fontWeightSemiBold,
    color: colorBlack,
    fontSize: 12,
    lineHeight: 15,
    textAlign: "center",
  },

  buttonGray: {
    backgroundColor: colorLightGrey,
    borderRadius: 8,
    height: 48,
    justifyContent: "center",
  },
  buttonGray_text: {
    ...fontWeightSemiBold,
    color: colorWhite,
    fontSize: 15,
    lineHeight: 18,
    textAlign: "center",
  },

  buttonGreen: {
    backgroundColor: colorGreen,
    borderRadius: 8,
    // flex: 1,
    height: 48,
    justifyContent: "center",
  },
  buttonGreen_text: {
    ...fontWeightSemiBold,
    color: colorWhite,
    fontSize: 15,
    lineHeight: 18,
    textAlign: "center",
  },

  buttonWhiteGreen: {
    borderColor: colorGreen,
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    justifyContent: "center",
  },
  buttonWhiteGreen_text: {
    ...fontWeightSemiBold,
    color: colorGreen,
    fontSize: 15,
    lineHeight: 18,
    textAlign: "center",
  },

  textInput: {
    ...fontWeightSemiBold,
    borderBottomColor: "#DADADA",
    borderBottomWidth: 2,
    color: colorGrey,
    fontSize: 15,
    lineHeight: 18,
    paddingHorizontal: 0,
    paddingVertical: Platform.OS === "ios" ? 10 : 7,
  },
  textInput_col2: {
    width: (dimWidth - containerPadding * 4 - 12) / 2,
  },
  textInput_col3: {
    width: (dimWidth - containerPadding * 4 - 24) / 3,
  },
  textInput_error: {
    borderBottomColor: "red",
  },
  textInput_fg: {
    flexGrow: 1,
  },
  textInput_w69: {
    marginLeft: 12,
    width: 69,
  },

  fullscreenLoading: {
    height: "100%",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
  },
  fullscreenLoading_background: {
    backgroundColor: colorCardBackground,
    height: "100%",
    opacity: 0.5,
    position: "absolute",
    width: "100%",
  },
});

export default styles;
