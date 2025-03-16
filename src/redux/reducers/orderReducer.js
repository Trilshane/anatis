import {
  ADD_TO_QUEUE,
  REPLACE_QUEUE,
  PUT_BASKET,
  PUT_DATETIME,
  SET_ORDER,
  SET_ORDER_DATE,
  SET_ORDER_TIME,
  SET_ORDER_PAYMENT,
  SHOW_MODAL_ORDER_DATE,
  HIDE_MODAL_ORDER_DATE,
  SHOW_MODAL_ORDER_TIME,
  HIDE_MODAL_ORDER_TIME,
} from "../types";

import { DEBUG_ORDER_FORM, DEBUG_QUEUE } from "../../params";

const initialState = {
  order: DEBUG_ORDER_FORM
    ? {
        address: "Тестовый адрес 123",
        name: "Тест",
        phone: "123456789",
        comment: "Тестовый заказ",
      }
    : {
        address: "",
        name: "",
        phone: "",
        comment: "",
      },
  queue: DEBUG_QUEUE
    ? {
        [13332]: { id: 13332, quantity: 3, reusable: true },
        [13333]: { id: 13333, quantity: 2, reusable: true },
      }
    : {},
  basket: [],
  bottlePrice: "",
  promocode: "",

  dateTime: {},
  orderDate: "",
  orderTime: "",
  orderPayment: 1,

  isModalOrderDateVisible: false,
  isModalOrderTimeVisible: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_QUEUE:
      return {
        ...state,
        queue: { ...state.queue, ...action.payload },
      };
    case REPLACE_QUEUE:
      return {
        ...state,
        queue: action.payload,
      };

    case PUT_BASKET:
      return {
        ...state,
        basket: action.payload.list,
        bottlePrice: action.payload.props.bottles_price,
        promocode: action.payload.props.promocode,
      };

    case PUT_DATETIME:
      const dateTime = action.payload.deliveryTime;
      return {
        ...state,
        dateTime,
        orderDate: Object.keys(dateTime)[0],
        orderTime: dateTime[Object.keys(dateTime)[0]][0],
      };

    case SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case SET_ORDER_DATE:
      return {
        ...state,
        orderDate: action.payload,
        orderTime: state.dateTime[action.payload][0],
      };
    case SET_ORDER_TIME:
      return {
        ...state,
        orderTime: action.payload,
      };
    case SET_ORDER_PAYMENT:
      return {
        ...state,
        orderPayment: action.payload,
      };

    case SHOW_MODAL_ORDER_DATE:
      return {
        ...state,
        isModalOrderDateVisible: action.payload,
      };
    case HIDE_MODAL_ORDER_DATE:
      return {
        ...state,
        isModalOrderDateVisible: action.payload,
      };

    case SHOW_MODAL_ORDER_TIME:
      return {
        ...state,
        isModalOrderTimeVisible: action.payload,
      };
    case HIDE_MODAL_ORDER_TIME:
      return {
        ...state,
        isModalOrderTimeVisible: action.payload,
      };

    default:
      return state;
  }
};
