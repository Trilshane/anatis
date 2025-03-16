import {
  SET_DATA_ALIF,
  SET_PAYMENT_LINK,
  SET_PAYMENT_ORDER_ID,
} from "../types";

const initialState = {
  link: "",
  orderId: "",
  dataAlif: "",
};

export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAYMENT_LINK:
      return {
        ...state,
        link: action.payload,
      };
    case SET_PAYMENT_ORDER_ID:
      return {
        ...state,
        orderId: action.payload,
      };
    case SET_DATA_ALIF:
      return {
        ...state,
        dataAlif: action.payload,
      };
    default:
      return state;
  }
};
