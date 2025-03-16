import {
  SET_IS_AUTH,
  PUT_LOGIN_SMS_RESPONSE,
  RESET_LOGIN_SMS_RESPONSE,
  PUT_SLIDER,
  SHOW_FULLSCREEN_LOADING,
  HIDE_FULLSCREEN_LOADING,
  SHOW_MODAL_LOGIN,
  HIDE_MODAL_LOGIN,
  SET_MODAL_LOGIN_SHOWN_AT_ORDER,
  SHOW_MODAL_PICKER,
  HIDE_MODAL_PICKER,
  SET_MODAL_PICKER_DATA,
  SHOW_MODAL_PRODUCT,
  HIDE_MODAL_PRODUCT,
  SET_MODAL_PRODUCT,
  SHOW_MODAL_SLIDER_TEXT,
  HIDE_MODAL_SLIDER_TEXT,
  SET_MODAL_SLIDER_TEXT,
} from "../types";

const initialState = {
  isAuth: false,
  loginSmsResponse: {},

  isFullscreenLoadingVisible: false,

  isModalLoginVisible: false,
  isModalLoginShownAtOrder: false,

  slider: [],

  isModalSliderTextVisible: false,
  modalSliderText: {},

  isModalPickerVisible: false,
  modalPickerList: [],
  modalPickerValue: "",
  modalPickerSetValue: () => {},
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_AUTH:
      return {
        ...state,
        isAuth: action.payload,
      };
    case PUT_LOGIN_SMS_RESPONSE:
      return {
        ...state,
        loginSmsResponse: action.payload,
      };
    case RESET_LOGIN_SMS_RESPONSE:
      return {
        ...state,
        loginSmsResponse: {},
      };

    case PUT_SLIDER:
      return {
        ...state,
        slider: action.payload.list,
      };

    case SHOW_FULLSCREEN_LOADING:
      return {
        ...state,
        isFullscreenLoadingVisible: true,
      };
    case HIDE_FULLSCREEN_LOADING:
      return {
        ...state,
        isFullscreenLoadingVisible: false,
      };

    case SHOW_MODAL_SLIDER_TEXT:
      return {
        ...state,
        isModalSliderTextVisible: action.payload,
      };
    case HIDE_MODAL_SLIDER_TEXT:
      return {
        ...state,
        isModalSliderTextVisible: action.payload,
      };
    case SET_MODAL_SLIDER_TEXT:
      return {
        ...state,
        modalSliderText: action.payload,
      };

    case SHOW_MODAL_LOGIN:
      return {
        ...state,
        isModalLoginVisible: true,
      };
    case HIDE_MODAL_LOGIN:
      return {
        ...state,
        isModalLoginVisible: false,
      };
    case SET_MODAL_LOGIN_SHOWN_AT_ORDER:
      return {
        ...state,
        isModalLoginShownAtOrder: action.payload,
      };

    case SHOW_MODAL_PICKER:
      return {
        ...state,
        isModalPickerVisible: true,
      };
    case HIDE_MODAL_PICKER:
      return {
        ...state,
        isModalPickerVisible: false,
      };

    case SET_MODAL_PICKER_DATA:
      return {
        ...state,
        modalPickerList: action.payload.list,
        modalPickerValue: action.payload.value,
        modalPickerSetValue: action.payload.setValue,
      };

    default:
      return state;
  }
};
