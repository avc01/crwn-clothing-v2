import { useSelector, useDispatch } from "react-redux";

import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles";
import {
  selectIsCartOpen,
  selectCartCount,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";

const CartIcon = () => {
  // Hooks
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  // Methods
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  // Return
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
