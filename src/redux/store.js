import { applyMiddleware, combineReducers, compose, createStore } from "redux";
// import { reducer as formReducer } from 'redux-form'
import createSagaMiddleware from "redux-saga";

import { appReducer } from "./reducers/appReducer";
import { catalogReducer } from "./reducers/catalogReducer";
import { historyReducer } from "./reducers/historyReducer";
import { orderReducer } from "./reducers/orderReducer";
import { paymentReducer } from "./reducers/paymentReducer";
import { sagaWatcher } from "./sagas";

const rootReducer = combineReducers({
  app: appReducer,
  catalog: catalogReducer,
  history: historyReducer,
  order: orderReducer,
  payment: paymentReducer,
  // form: formReducer,
});

const saga = createSagaMiddleware();
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(saga),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : compose
  )
);
// const store = createStore(rootReducer, applyMiddleware(saga))
saga.run(sagaWatcher);

export default store;
