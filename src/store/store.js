// Imports
import { compose, applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//import thunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";

import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

// Redux - Persist Config
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user", "categories"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux - Saga Config
const sagaMiddleware = createSagaMiddleware();

// Middlewares bucket
const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter(Boolean);

// Middleware creation for Chrome Extension Redux Extension Tools
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares)); // Middlewares

export const store = createStore(persistedReducer, composedEnhancers); // Store Creation

sagaMiddleware.run(rootSaga); // Redux - Saga Config / After the store is created

export const persistor = persistStore(store); // Redux - Persist
