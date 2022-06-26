// Imports
import { AnyAction } from "redux";

import { CartItem } from "./cart.types";
import { setIsCartOpen, setCartItems } from "./cart.action";

// Types
export type CartState = {
  isCartOpen: boolean;
  cartItems: CartItem[];
};

// Reducer Initial State
const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

// Reducer
export const cartReducer = (
  state = CART_INITIAL_STATE,
  action: AnyAction
): CartState => {
  if (setIsCartOpen.match(action)) {
    return { ...state, isCartOpen: action.payload };
  }

  if (setCartItems.match(action)) {
    return { ...state, cartItems: action.payload };
  }

  return state;
};
