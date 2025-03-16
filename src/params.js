// Для релизного билда все значения в блоке ниже должны быть false
export const DEBUG_LOGIN = false; // Заполнить форму логиа тестовыми данными
export const DEBUG_LOGOUT = false; // Очистить куки на старте приложения
export const DEBUG_ORDER_FORM = false; // Заполнить форму заказа тестовыми данными
export const DEBUG_ORDER_PRICE = false; // Установить стоимость корзины в 1 сом для оплаты картой
export const DEBUG_QUEUE = false; // Заполнить очередь тестовыми данными
export const DEBUG_SCHEME = false; // Проверить Deep Linking через https://anatis.tj/testapi/

export const PHONE_MASK = [
  "+",
  "9",
  "9",
  "2",
  " ",
  "(",
  [/\d/],
  [/\d/],
  ")",
  " ",
  [/\d/],
  [/\d/],
  [/\d/],
  "-",
  [/\d/],
  [/\d/],
  "-",
  [/\d/],
  [/\d/],
];
export const PHONE_MASK_PLACEHOLDER = "+992 (";
export const SMS_CODE_MASK = [[/\d/], [/\d/], [/\d/], [/\d/]];

import React from "react";

import {
  MenuAccessoriesIcon,
  MenuHistoryIcon,
  MenuLoginIcon,
  MenuProductsIcon,
  MenuWaterIcon,
} from "./components/Interface";
import { colorAnotherBlue, colorWhite } from "./styles/Styles";

export const headerOrderFadeDelay = 250;
export const indexSliderDelay = 3000;
export const modalOrderAutoCloseDelay = 250;

export const pickerPropsPayment = [
  { label: "Оплата наличными", value: 1 },
  // { label: "Оплата картой", value: 3 },
  { label: "Алиф Моби/Корти Милли", value: 5 },
];

export const menuList = [
  {
    key: "water",
    code: "voda",
    name: "Вода",
    filterName: "water",
    icon: <MenuWaterIcon color={colorAnotherBlue} />,
    iconActive: <MenuWaterIcon color={colorWhite} />,
  },
  {
    key: "products",
    code: "soputstvuyushchie-tovary",
    name: "Товары",
    filterName: "relatedProducts",
    icon: <MenuProductsIcon color={colorAnotherBlue} />,
    iconActive: <MenuProductsIcon color={colorWhite} />,
  },
  {
    key: "accessories",
    code: "oborudovanie-i-aksessuary",
    name: "Оборуд.",
    filterName: "equipment",
    icon: <MenuAccessoriesIcon color={colorAnotherBlue} />,
    iconActive: <MenuAccessoriesIcon color={colorWhite} />,
  },
  {
    key: "history",
    code: "history",
    name: "Заказы",
    icon: <MenuHistoryIcon color={colorAnotherBlue} />,
    iconActive: <MenuHistoryIcon color={colorWhite} />,
  },
  {
    key: "login",
    code: "login",
    name: "Вход",
    icon: <MenuLoginIcon color={colorAnotherBlue} />,
    iconActive: <MenuLoginIcon color={colorWhite} />,
  },
];
