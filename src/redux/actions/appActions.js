import {
  AUTO_LOGIN,
  POST_LOGIN_PHONE,
  POST_LOGIN_SMS,
  PUT_LOGIN_SMS_RESPONSE,
  RESET_LOGIN_SMS_RESPONSE,
  SET_IS_AUTH,
  POST_DEVICE_TOKEN,
  GET_SLIDER,
  PUT_SLIDER,
  SHOW_FULLSCREEN_LOADING,
  HIDE_FULLSCREEN_LOADING,
  SHOW_MODAL_SLIDER_TEXT,
  HIDE_MODAL_SLIDER_TEXT,
  SET_MODAL_SLIDER_TEXT,
  SHOW_MODAL_LOGIN,
  HIDE_MODAL_LOGIN,
  SET_MODAL_LOGIN_SHOWN_AT_ORDER,
  SHOW_MODAL_PICKER,
  HIDE_MODAL_PICKER,
  SET_MODAL_PICKER_DATA,
} from "../types";

export const autoLogin = (data) => ({ type: AUTO_LOGIN, payload: data });
export const postLoginPhone = (data) => ({
  type: POST_LOGIN_PHONE,
  payload: data,
});
export const postLoginSms = (data) => ({ type: POST_LOGIN_SMS, payload: data });
export const putLoginSmsResponse = (data) => ({
  type: PUT_LOGIN_SMS_RESPONSE,
  payload: data,
});
export const resetLoginSmsResponse = () => ({ type: RESET_LOGIN_SMS_RESPONSE });
export const setIsAuth = (data) => ({ type: SET_IS_AUTH, payload: data });

export const postDeviceToken = (data) => ({
  type: POST_DEVICE_TOKEN,
  payload: data,
});

export const getSlider = () => ({ type: GET_SLIDER });
export const putSlider = (data) => ({ type: PUT_SLIDER, payload: data });

export const showFullscreenLoading = () => ({ type: SHOW_FULLSCREEN_LOADING });
export const hideFullscreenLoading = () => ({ type: HIDE_FULLSCREEN_LOADING });

export const showModalSliderText = () => ({
  type: SHOW_MODAL_SLIDER_TEXT,
  payload: true,
});
export const hideModalSliderText = () => ({
  type: HIDE_MODAL_SLIDER_TEXT,
  payload: false,
});
export const setModalSliderText = (data) => ({
  type: SET_MODAL_SLIDER_TEXT,
  payload: data,
});

export const showModalLogin = () => ({ type: SHOW_MODAL_LOGIN });
export const hideModalLogin = () => ({ type: HIDE_MODAL_LOGIN });
export const setModalLoginShownAtOrder = (data) => ({
  type: SET_MODAL_LOGIN_SHOWN_AT_ORDER,
  payload: data,
});

export const showModalPicker = () => ({ type: SHOW_MODAL_PICKER });
export const hideModalPicker = () => ({ type: HIDE_MODAL_PICKER });

export const setModalPickerData = (data) => ({
  type: SET_MODAL_PICKER_DATA,
  payload: data,
});
