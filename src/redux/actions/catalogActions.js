import {
  GET_CATALOG,
  PUT_CATALOG,
  SHOW_MODAL_PRODUCT,
  HIDE_MODAL_PRODUCT,
  SET_MODAL_PRODUCT,
  SHOW_MODAL_FILTER,
  HIDE_MODAL_FILTER,
  SET_FILTER_LIST,
  SET_FILTER_CATEGORIES,
  SET_FILTER_ORDER,
  RESET_FILTER,
} from "../types";

export const getCatalog = () => {
  return {
    type: GET_CATALOG,
  };
};
export const putCatalog = (data) => {
  return {
    type: PUT_CATALOG,
    payload: data,
  };
};

export const showModalProduct = () => {
  return {
    type: SHOW_MODAL_PRODUCT,
    payload: true,
  };
};
export const hideModalProduct = () => {
  return {
    type: HIDE_MODAL_PRODUCT,
    payload: false,
  };
};
export const setModalProduct = (data) => {
  return {
    type: SET_MODAL_PRODUCT,
    payload: data,
  };
};

export const showModalFilter = () => {
  return {
    type: SHOW_MODAL_FILTER,
    payload: true,
  };
};
export const hideModalFilter = () => {
  return {
    type: HIDE_MODAL_FILTER,
    payload: false,
  };
};

export const setFilterList = (data) => {
  return {
    type: SET_FILTER_LIST,
    payload: data,
  };
};
export const setFilterCategories = (data) => {
  return {
    type: SET_FILTER_CATEGORIES,
    payload: data,
  };
};
export const setFilterOrder = (data) => {
  return {
    type: SET_FILTER_ORDER,
    payload: data,
  };
};
export const resetFilter = () => {
  return {
    type: RESET_FILTER,
  };
};
