import {
  PUT_CATALOG,
  SHOW_MODAL_PRODUCT,
  HIDE_MODAL_PRODUCT,
  SET_MODAL_PRODUCT,
  SHOW_MODAL_FILTER,
  HIDE_MODAL_FILTER,
  SET_FILTER_LIST,
  SET_FILTER_ORDER,
  SET_FILTER_CATEGORIES,
  RESET_FILTER,
} from "../types";

import { getMenuDataByKey } from "../../tools";

const initialState = {
  list: [],
  filter: {},
  filteredList: { index: [] },

  isModalProductVisible: false,
  modalProduct: {},

  isModalFilterVisible: false,
  filterList: [],
  filterCategories: [],
  filterOrder: "", // ['price_asc', 'price_desc', 'rating'] Это вот должно быть в константах
};

export const catalogReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_CATALOG:
      return {
        ...state,
        list: action.payload.list,
        filter: action.payload.filter,
        filteredList: filterProductList(action.payload.list),
      };

    case SHOW_MODAL_PRODUCT:
      return {
        ...state,
        isModalProductVisible: action.payload,
      };
    case HIDE_MODAL_PRODUCT:
      return {
        ...state,
        isModalProductVisible: action.payload,
      };
    case SET_MODAL_PRODUCT:
      return {
        ...state,
        modalProduct: action.payload,
      };

    case SHOW_MODAL_FILTER:
      return {
        ...state,
        isModalFilterVisible: action.payload,
      };
    case HIDE_MODAL_FILTER:
      return {
        ...state,
        isModalFilterVisible: action.payload,
      };

    case SET_FILTER_LIST:
      return {
        ...state,
        filterList: action.payload,
      };
    case SET_FILTER_CATEGORIES:
      return {
        ...state,
        filterCategories: action.payload,
      };
    case SET_FILTER_ORDER:
      return {
        ...state,
        filterOrder: action.payload,
      };
    case RESET_FILTER:
      return {
        ...state,
        filterCategories: [],
        filterOrder: "",
      };

    default:
      return state;
  }
};

const filterProductList = (productList) => {
  const waterCode = getMenuDataByKey("water").code;
  const productsCode = getMenuDataByKey("products").code;
  const accessoriesCode = getMenuDataByKey("accessories").code;
  return {
    ["index"]: productList.filter((item) => item.HIT == true),
    [waterCode]: productList.filter(
      (item) => item.CATALOG_SECTION_CODE == waterCode
    ),
    [productsCode]: productList.filter(
      (item) => item.CATALOG_SECTION_CODE == productsCode
    ),
    [accessoriesCode]: productList.filter(
      (item) => item.CATALOG_SECTION_CODE == accessoriesCode
    ),
  };
};
