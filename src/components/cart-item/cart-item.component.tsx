import { FC, memo } from "react";

import { CartItem } from "../../store/cart/cart.types";

import { ItemDetails, CartItemContainer, Name } from "./cart-item.styles";

type CartItemProps = {
  cartItem: CartItem;
};

const CartItemComponent: FC<CartItemProps> = memo(({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemDetails>
        <Name>{name}</Name>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
});

export default CartItemComponent;
