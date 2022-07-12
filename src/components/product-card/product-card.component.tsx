import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

import { CategoryItem } from "../../store/categories/category.types";

import {
  Price,
  Footer,
  Name,
  ProductCardContainer,
} from "./product-card.styles";

type ProductCardProps = {
  product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, price, imageUrl } = product;

  // Hooks
  const dispatch = useDispatch();
  const currentCartItems = useSelector(selectCartItems);

  // Handlers
  const addProductToCart = () =>
    dispatch(addItemToCart(currentCartItems, product));

  // Return
  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={name}></img>
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>

      <Button
        onClick={addProductToCart}
        buttonType={BUTTON_TYPE_CLASSES.inverted}
      >
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
