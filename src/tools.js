import { menuList } from "./params";

export const getMenuDataByCode = (code) => {
  return menuList.filter((item) => item.code == code)[0];
};
export const getMenuDataByKey = (key) => {
  return menuList.filter((item) => item.key == key)[0];
};

export const getOrderDataFromHistory = (history) => {
  const newOrder = {
    address: history["ADDRESS"],
    entrance: history["ENTRANCE"],
    office: history["APARTMENT"],
    intercom: history["INTERCOM"],

    name: history["NAME"],
    phone: history["PHONE"],
    comment: history["COMMENT"],
  };
  const newOrderPayment = history["PAY_SYSTEM_ID"];
  return [newOrder, newOrderPayment];
};
