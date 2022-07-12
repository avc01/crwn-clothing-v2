import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { MenuCategories } from "../directory/directory.component";

import {
  Body,
  BackgroundImage,
  DirectoryItemContainer,
} from "./directory-item.styles";

type DirectoryItemProps = {
  category: MenuCategories;
};

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
