// Imports
import { compose, applyMiddleware, createStore } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

//Config
const MiddleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...MiddleWares));

export const store = createStore(rootReducer, composedEnhancers);
