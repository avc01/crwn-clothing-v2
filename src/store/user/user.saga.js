// Imports
import { takeLatest, put, call, all } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";

import { signInSuccess, signInFailed } from "./user.action";
import {
  getCurrentUser,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

// Saga Generators
function* getSnapshotFromUserAuth(userAuth, additionalDetails = {}) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );

    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

// Global Saga Listener Export
export function* userSagas() {
  yield all([call(onCheckUserSession)]);
}
