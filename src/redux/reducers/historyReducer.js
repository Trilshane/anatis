import { PUT_HISTORY, RESET_HISTORY } from "../types";

const initialState = {
  list: [],
};

export const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_HISTORY:
      return {
        ...state,
        list: action.payload.list,
      };
    case RESET_HISTORY:
      return {
        ...state,
        list: [],
      };

    default:
      return state;
  }
};
