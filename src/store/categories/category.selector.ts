import { createSelector } from "reselect";

import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";
import { Category } from "./category.types";
import { RootState } from "../store";

// State as any just by now
const selectCategoriesReducer = (state: RootState): CategoriesState =>
  state.categories;

const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice): Category[] => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

export const selectIsLoading = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice): boolean => categoriesSlice.isLoading
);
