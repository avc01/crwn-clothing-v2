// Imports
import { takeLatest, put, call, all } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";

import {
  signInSuccess,
  signInFailed,
  signUpFailed,
  signUpSuccess,
  signOutFailed,
  signOutSuccess,
} from "./user.action";
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
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

function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* signInWithEmail(action) {
  try {
    const {
      payload: { email, password },
    } = action;

    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );

    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* signUp(action) {
  try {
    const {
      payload: { email, password, displayName },
    } = action;
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );

    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailed(error));
  }
}

function* signInAfterSignUp(action) {
  const {
    payload: { user, additionalDetails },
  } = action;
  yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

// Saga Generators Encapsulators
function* onSignOut() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

// Global Saga Listener Export
export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOut),
  ]);
}
