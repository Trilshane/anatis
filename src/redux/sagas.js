import { Alert } from "react-native";
import { call, put, takeEvery, throttle } from "redux-saga/effects";

import { API, getRequest, postRequest } from "../api";
import {
  AUTO_LOGIN,
  POST_LOGIN_PHONE,
  POST_LOGIN_SMS,
  POST_DEVICE_TOKEN,
  GET_BASKET,
  GET_CATALOG,
  GET_DATETIME,
  GET_HISTORY,
  GET_SLIDER,
  POST_ORDER,
  POST_CREATE_PAYMENT,
  POST_CHECK_PAYMENT,
  RELEASE_QUEUE,
  POST_ADD_PROMOCODE,
  POST_REMOVE_PROMOCODE,
  POST_CREATE_PAYMENT_ALIF,
} from "./types";

import {
  hideFullscreenLoading,
  showFullscreenLoading,
} from "./actions/appActions";
import { putCatalog } from "./actions/catalogActions";
import { putHistory } from "./actions/historyActions";
import {
  getBasket,
  putBasket,
  putDateTime,
  replaceQueue,
} from "./actions/orderActions";
import {
  postCreatePayment,
  postCreatePaymentAlif,
  setDataALif,
  setPaymentLink,
  setPaymentOrderId,
} from "./actions/paymentActions";

import {
  workerAutoLogin,
  workerGetSlider,
  workerPostDeviceToken,
  workerPostLoginPhone,
  workerPostLoginSms,
} from "./sagaWorkers/appWorkers";

import {
  alertAddPromocode,
  alertRemovePromocode,
  alertPostOrder,
  alertPostCheckPayment,
} from "../utils/alertUtils";
import { DEBUG_ORDER_PRICE } from "../params";

export function* sagaWatcher() {
  // app
  yield takeEvery(AUTO_LOGIN, workerAutoLogin);
  yield takeEvery(GET_SLIDER, workerGetSlider);
  yield takeEvery(POST_DEVICE_TOKEN, workerPostDeviceToken);
  yield takeEvery(POST_LOGIN_PHONE, workerPostLoginPhone);
  yield takeEvery(POST_LOGIN_SMS, workerPostLoginSms);

  yield takeEvery(GET_CATALOG, workerGetCatalog);

  yield takeEvery(GET_HISTORY, workerGetHistory);

  yield takeEvery(GET_BASKET, workerGetBasket);
  yield takeEvery(GET_DATETIME, workerGetDateTime);

  yield throttle(3000, RELEASE_QUEUE, workerPostQueue);
  yield takeEvery(POST_ADD_PROMOCODE, workerPostAddPromocode);
  yield takeEvery(POST_REMOVE_PROMOCODE, workerPostRemovePromocode);
  yield takeEvery(POST_ORDER, workerPostOrder);
  yield takeEvery(POST_CREATE_PAYMENT, workerPostCreatePayment);
  yield takeEvery(POST_CREATE_PAYMENT_ALIF, workerPostCreatePaymentAlif);
  yield takeEvery(POST_CHECK_PAYMENT, workerPostCheckPayment);
}

function* workerGetCatalog() {
  const data = yield call(() => getRequest(API.getCatalog));
  if (data.status === "ok") {
    console.log("saga getCatalog OK");
    yield put(putCatalog(data));
  } else if (data.status === "error") {
    console.log(`saga getCatalog ${data.message}`);
  }
}

function* workerGetHistory() {
  const data = yield call(() => getRequest(API.getHistory));
  if (data.status === "ok") {
    console.log("saga getHistory OK");
    yield put(putHistory(data));
  } else if (data.status === "error") {
    console.log(`saga getHistory ${data.message}`);
  }
}

function* workerGetDateTime() {
  const data = yield call(() => getRequest(API.getDateTime));
  if (data.status === "ok") {
    console.log("saga getDateTime OK");
    yield put(putDateTime(data));
  } else if (data.status === "error") {
    console.log(`saga getDateTime ${data.message}`);
  }
}

function* workerGetBasket() {
  const data = yield call(() => getRequest(API.getBasket));
  if (data.status === "ok") {
    console.log("saga getBasket OK");
    yield put(putBasket(data));
  } else if (data.status === "error") {
    console.log(`saga getBasket ${data.message}`);
  }
}

function* workerPostQueue(action) {
  const data = yield call(() => postRequest(API.postQueue, action.payload));
  if (data.status === "ok") {
    console.log("saga postQueue OK");
    // После отправки очереди нужно подтянуть корзину с ценами
    yield put(getBasket());
  } else if (data.status === "error") {
    console.log(`saga postQueue ${data.message}`);
  }
}

function* workerPostOrder(action) {
  yield put(showFullscreenLoading());
  const data = yield call(() => postRequest(API.postOrder, action.payload));
  if (data.status === "ok") {
    console.log("saga postOrder OK");
    console.log("saga postOrder", data);
    console.log("action", action);

    if (action.payload.payment == 1) {
      // Оплата наличными
      yield put(hideFullscreenLoading());
      alertPostOrder();
      // } else if (action.payload.payment === 3) {
      //   yield put(hideFullscreenLoading());
      //   // Оплата картой
      //   let paymentData = data.data;
      //   if (DEBUG_ORDER_PRICE) {
      //     paymentData.price = 1;
      //   }
      //   paymentData.email = "trilshane@yandex.ru";
      //   paymentData.successScheme = "anatis://payment_success";
      //   paymentData.declineScheme = "anatis://payment_error";
      //   console.log("paymentData", paymentData);
      //   yield put(postCreatePayment(paymentData));
    } else if (action.payload.payment == 5) {
      yield put(hideFullscreenLoading());
      // Оплата картой Алиф
      let paymentData = data.data;
      if (DEBUG_ORDER_PRICE) {
        paymentData.price = 1;
      }
      paymentData.successScheme = "anatis://payment_success";
      paymentData.declineScheme = "anatis://payment_error";
      console.log("paymentData", paymentData);
      yield put(postCreatePaymentAlif(paymentData));
    }
    yield put(replaceQueue({})); // Очистка очереди после оформления заказа
  } else if (data.status === "error") {
    console.log(`saga postOrder ${data.message}`);
    Alert.alert(data.message);
  }
}

function* workerPostCreatePayment(action) {
  const data = yield call(() =>
    postRequest(API.postCreatePayment, action.payload),
  );
  console.log("workerPostCreatePayment", data);

  if (data.status === "newPayment") {
    console.log("saga postCreatePayment OK");
    console.log("saga postCreatePayment", data);
    yield put(setPaymentLink(data.link));
    yield put(setPaymentOrderId(action.payload.orderId));
  }
}

function* workerPostCreatePaymentAlif(action) {
  const data = yield call(() =>
    postRequest(API.postCreatePaymentAlif, action.payload),
  );
  console.log("workerPostCreatePaymentAlif", data);

  if (data.status === "newPayment") {
    console.log("saga postCreatePaymentAlif OK");
    console.log("saga postCreatePaymentAlif", data);
    yield put(setPaymentLink(data.link));
    yield put(setPaymentOrderId(action.payload.orderId));
    yield put(setDataALif(data.data));
  }
}

function* workerPostCheckPayment(action) {
  console.log("saga postCheckPayment action.payload", action.payload);
  const data = yield call(() =>
    postRequest(API.postCheckPayment, action.payload),
  );
  console.log("saga postCheckPayment", data);
  if (data.status === "ok") {
    console.log("saga postCheckPayment OK");
    console.log("saga postCheckPayment", data);
    alertPostCheckPayment();
  } else if (data.status === "error") {
    Alert.alert(data.message);
  }
}

function* workerPostAddPromocode(action) {
  const data = yield call(() =>
    postRequest(API.postAddPromocode, action.payload),
  );
  console.log(data);
  if (data.status === "ok") {
    console.log("saga postPromocode OK");
    alertAddPromocode(action.payload.promocode);
    // После применения промокода нужно подтянуть корзину с новыми ценами
    yield put(getBasket());
  } else if (data.status === "error") {
    Alert.alert(data.message);
  }
}

function* workerPostRemovePromocode() {
  const data = yield call(() => postRequest(API.postRemovePromocode));
  if (data.status === "ok") {
    console.log("saga postPromocodeRemove OK");
    alertRemovePromocode();
    // После удаления промокода нужно подтянуть корзину с новыми ценами
    yield put(getBasket());
  }
}
