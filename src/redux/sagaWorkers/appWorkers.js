import { call, put } from "redux-saga/effects";

import { API, getRequest, postRequest } from "../../api";

import {
  hideModalLogin,
  putLoginSmsResponse,
  putSlider,
  setIsAuth,
  setModalLoginShownAtOrder,
} from "../actions/appActions";
import { getCatalog } from "../actions/catalogActions";
import { getHistory } from "../actions/historyActions";
import { getBasket } from "../actions/orderActions";
import { setStorageData } from "../../utils/appUtils";

export function* workerAutoLogin(action) {
  const data = yield call(() => postRequest(API.autoLogin, action.payload));
  if (data.status === "ok") {
    console.log("saga autoLogin OK");
    yield put(setIsAuth(true));
    yield put(getHistory());
    if (data["isReloadCatalog"] === true) {
      console.log("saga autoLogin reloadCatalog");
      yield put(getCatalog());
    }
  } else if (data.status === "error") {
    console.log(`saga autoLogin ${data.message} 111111111111`);
  }
}

export function* workerGetSlider() {
  const data = yield call(() => getRequest(API.getSlider));
  if (data.status === "ok") {
    console.log("saga getSlider OK");
    yield put(putSlider(data));
  } else if (data.status === "error") {
    console.log(`saga getSlider ${data.message}`);
  }
}

export function* workerPostDeviceToken(action) {
  console.log("action", action);
  const data = {
    token: action.payload.token,
  };
  const response = yield call(() => postRequest(API.postDeviceToken, data));
  console.log("response", response);
  if (response.status === "ok") {
    console.log("saga postDeviceToken OK");
  } else if (response.status === "error") {
    console.log(`saga postDeviceToken ${data.message}`);
  }
}

export function* workerPostLoginPhone(action) {
  const data = {
    phone: action.payload.phone,
  };
  const response = yield call(() => postRequest(API.postLoginPhone, data));
  if (response.status === "ok") {
    console.log("saga postLoginPhone OK");
  } else if (response.status === "error") {
    console.log(`saga postLoginPhone ${response.message}`);
  }
}

export function* workerPostLoginSms(action) {
  const data = {
    phone: action.payload.phone,
    code: action.payload.smsCode,
  };
  const response = yield call(() => postRequest(API.postLoginSms, data));
  yield put(putLoginSmsResponse(response));
  if (response.status === "ok") {
    console.log("saga postLoginSms OK");
    yield setStorageData("phone", action.payload.phone);
    yield put(setIsAuth(true));
    yield put(setModalLoginShownAtOrder(false));
    yield put(hideModalLogin());
    yield put(getHistory());
    yield put(getBasket());
    if (response["isReloadCatalog"] === true) {
      console.log("saga postLoginSms reloadCatalog");
      yield put(getCatalog());
    }
  } else if (response.status === "error") {
    console.log(`saga postLoginSms ${response.message}`);
  }
}
