import { AnyAction } from "redux";

// Types
export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

// Actions -  Function Overloading with TypeScript

// Overload #1
export function createAction<T extends string, P extends any>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

// Overload #2
export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

// Implementation of the overloadings
export function createAction<T extends string, P extends any>(
  type: T,
  payload: P
) {
  return { type, payload };
}
