import { GET_HISTORY, PUT_HISTORY, RESET_HISTORY } from "../types";

export const getHistory = () => {
  return {
    type: GET_HISTORY,
  };
};
export const putHistory = (data) => {
  return {
    type: PUT_HISTORY,
    payload: data,
  };
};
export const resetHistory = () => {
  return {
    type: RESET_HISTORY,
  };
};
