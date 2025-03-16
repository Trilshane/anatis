import {
  POST_CHECK_PAYMENT,
  POST_CREATE_PAYMENT,
  POST_CREATE_PAYMENT_ALIF,
  SET_DATA_ALIF,
  SET_PAYMENT_LINK,
  SET_PAYMENT_ORDER_ID,
} from "../types";

export const postCheckPayment = (data) => {
  data = { orderId: data };
  return {
    type: POST_CHECK_PAYMENT,
    payload: data,
  };
};

export const postCreatePayment = (data) => {
  return {
    type: POST_CREATE_PAYMENT,
    payload: data,
  };
};

export const postCreatePaymentAlif = (data) => {
  return {
    type: POST_CREATE_PAYMENT_ALIF,
    payload: data,
  };
};

export const setPaymentLink = (data) => {
  return {
    type: SET_PAYMENT_LINK,
    payload: data,
  };
};
export const setDataALif = (data) => {
  return {
    type: SET_DATA_ALIF,
    payload: data,
  };
};

export const setPaymentOrderId = (data) => {
  return {
    type: SET_PAYMENT_ORDER_ID,
    payload: data,
  };
};
