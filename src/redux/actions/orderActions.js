import {
  ADD_TO_QUEUE,
  REPLACE_QUEUE,
  RELEASE_QUEUE,
  GET_BASKET,
  PUT_BASKET,
  POST_ADD_PROMOCODE,
  POST_REMOVE_PROMOCODE,
  GET_DATETIME,
  PUT_DATETIME,
  SET_ORDER,
  SET_ORDER_DATE,
  SET_ORDER_TIME,
  SET_ORDER_PAYMENT,
  POST_ORDER,
  SHOW_MODAL_ORDER_DATE,
  HIDE_MODAL_ORDER_DATE,
  SHOW_MODAL_ORDER_TIME,
  HIDE_MODAL_ORDER_TIME,
} from "../types";

export const addToQueue = (data) => {
  return {
    type: ADD_TO_QUEUE,
    payload: data,
  };
};
export const replaceQueue = (data) => {
  return {
    type: REPLACE_QUEUE,
    payload: data,
  };
};
export const releaseQueue = (data) => {
  data = Object.values(data).map((item) => ({
    productId: item.id,
    quantity: item.quantity,
  }));
  return {
    type: RELEASE_QUEUE,
    payload: data,
  };
};

export const getBasket = () => {
  return {
    type: GET_BASKET,
  };
};
export const putBasket = (data) => {
  return {
    type: PUT_BASKET,
    payload: data,
  };
};

export const postAddPromocode = (data) => {
  data = { promocode: data };
  return {
    type: POST_ADD_PROMOCODE,
    payload: data,
  };
};
export const postRemovePromocode = () => {
  return {
    type: POST_REMOVE_PROMOCODE,
  };
};

export const getDateTime = () => {
  return {
    type: GET_DATETIME,
  };
};
export const putDateTime = (data) => {
  return {
    type: PUT_DATETIME,
    payload: data,
  };
};

export const setOrder = (data) => {
  return {
    type: SET_ORDER,
    payload: data,
  };
};
export const setOrderDate = (data) => {
  return {
    type: SET_ORDER_DATE,
    payload: data,
  };
};
export const setOrderTime = (data) => {
  return {
    type: SET_ORDER_TIME,
    payload: data,
  };
};
export const setOrderPayment = (data) => {
  return {
    type: SET_ORDER_PAYMENT,
    payload: data,
  };
};
export const postOrder = (data) => {
  return {
    type: POST_ORDER,
    payload: data,
  };
};

export const showModalOrderDate = () => {
  return {
    type: SHOW_MODAL_ORDER_DATE,
    payload: true,
  };
};
export const hideModalOrderDate = () => {
  return {
    type: HIDE_MODAL_ORDER_DATE,
    payload: false,
  };
};

export const showModalOrderTime = () => {
  return {
    type: SHOW_MODAL_ORDER_TIME,
    payload: true,
  };
};
export const hideModalOrderTime = () => {
  return {
    type: HIDE_MODAL_ORDER_TIME,
    payload: false,
  };
};
