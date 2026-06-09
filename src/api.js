export const API_URL = "https://anatis.tj/api/v2/";

export const API = {
  autoLogin: "user/autoLogin.php",
  getBasket: "basket/getBasket.php",
  getCatalog: "catalog/getCatalog.php",
  getDateTime: "order/getAvailableTime.php",
  getHistory: "user/getAllOrders.php",
  getSlider: "main/getSlider.php",
  getOrderConditions: "main/getOrderConditions.php",
  postAddPromocode: "order/usedPromocode.php",
  postCheckPayment: "order/isSuccessfulPayment.php",
  postCreatePayment: "order/doPayment.php",
  postCreatePaymentAlif: "order/doPaymentAlif.php",
  postDeviceToken: "user/postDeviceToken.php",
  postLoginPhone: "user/sendSms.php",
  postLoginSms: "user/loginBySms.php",
  postOrder: "order/doOrder.php",
  postQueue: "basket/addListBasket.php",
  postRemovePromocode: "order/remotePromocode.php",
};

export const getRequest = (api) => {
  return fetch(API_URL + api).then((response) => response.json());
};

export function postRequest(api, data) {
  return fetch(API_URL + api, {
    method: "POST",
    body: JSON.stringify(data),
    // }).then((response) => response.json())
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.log("postRequest ERROR", api);
    }
  });
}
