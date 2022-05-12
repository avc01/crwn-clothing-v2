import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {
  // Hooks
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  // Methods
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  // Return
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
