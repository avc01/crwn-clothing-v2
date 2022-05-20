import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";

export const rootRedurcer = combineReducers({
  user: userReducer,
});
