// Imports
import { compose, applyMiddleware, createStore, Middleware } from "redux";
import logger from "redux-logger";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
//import thunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";

import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

// Types
export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

// Redux - Persist Config
const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux - Saga Config
const sagaMiddleware = createSagaMiddleware();

// Middlewares bucket
const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

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
