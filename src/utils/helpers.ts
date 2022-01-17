import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {TIngredient} from "./types";

export const isActivePath = (currentPath: string, pathname: string): boolean => {
  return currentPath === pathname;
};

export const checkResponseStatus = (response: Response) => {
  if (!response.ok) {
    return Promise.reject(new Error(response.statusText));
  }
  return Promise.resolve(response);
};

export const useIngredientInfo = (): Array<TIngredient> => {
  const location = useLocation();
  const ingredientId = location.pathname.split('/')[2];
  return useSelector((state: any) => state.ingredients.items).filter((value: TIngredient) => value._id === ingredientId)[0];
};
