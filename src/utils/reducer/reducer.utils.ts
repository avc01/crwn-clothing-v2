// Imports
import { AnyAction } from "redux";

// Action Types
export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

/*
Action creator validator for each reducer
*/

type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};

// Overload signature #1
export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

// Overload signature #1
export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

//Implementation of the overloadings
export function withMatcher(actionCreator: Function) {
  let type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

/* 
Actions -  Function Overloading with TypeScript 
*/

// Overload signature #1
export function createAction<T extends string, P extends any>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

// Overload signature #2
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
