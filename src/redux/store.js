import { applyMiddleware, combineReducers, compose, createStore } from "redux";
// import { reducer as formReducer } from 'redux-form'
// import createSagaMiddleware from "redux-saga";

import { appReducer } from "./reducers/appReducer";
import { catalogReducer } from "./reducers/catalogReducer";
import { historyReducer } from "./reducers/historyReducer";
import { orderReducer } from "./reducers/orderReducer";
import { paymentReducer } from "./reducers/paymentReducer";
import { sagaWatcher } from "./sagas";

const createSagaMiddleware = require("redux-saga").default;

const rootReducer = combineReducers({
  app: appReducer,
  catalog: catalogReducer,
  history: historyReducer,
  order: orderReducer,
  payment: paymentReducer,
});

const saga = createSagaMiddleware();
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(saga),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : compose,
  ),
);

saga.run(sagaWatcher);

export default store;
