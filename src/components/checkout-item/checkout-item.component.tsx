import { FC, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  clearItemFromCart,
  addItemToCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

import { CartItem } from "../../store/cart/cart.types";

import {
  CheckoutItemContainer,
  Arrow,
  ImageContainer,
  Name,
  Price,
  Quantity,
  RemoveButton,
  Value,
} from "./checkout-item.styles";

type CheckoutItemProps = {
  cartItem: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = memo(({ cartItem }) => {
  // Destructuring
  const { name, imageUrl, price, quantity } = cartItem;

  // Hooks
  const dispatch = useDispatch();
  const currentCartItems = useSelector(selectCartItems);

  // Handlers
  const clearItemHandler = () =>
    dispatch(clearItemFromCart(currentCartItems, cartItem));

  const addItemHandler = () =>
    dispatch(addItemToCart(currentCartItems, cartItem));

  const removeItemHandler = () =>
    dispatch(removeItemFromCart(currentCartItems, cartItem));

  // Return
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <Name>{name}</Name>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <Price>{price}</Price>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
});

export default CheckoutItem;
