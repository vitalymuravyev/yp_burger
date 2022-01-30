import {useLocation} from "react-router-dom";
import {useSelector as useSelectorHook, TypedUseSelectorHook, useDispatch as useDispatchHook} from "react-redux";
import {TIngredient, RootState, AppThunk, AppDispatch } from "./types";

export const isActivePath = (currentPath: string, pathname: string): boolean => {
  return currentPath === pathname;
};

export const checkResponseStatus = (response: Response) => {
  if (!response.ok) {
    return Promise.reject(new Error(response.statusText));
  }
  return Promise.resolve(response);
};

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorHook;

export const useDispatch = () => useDispatchHook<AppDispatch | AppThunk>();

export const useIngredientInfo = (): TIngredient => {
  const location = useLocation();
  const ingredientId = location.pathname.split('/')[2];
  return useSelector((state) => state.ingredients.items).filter((value: TIngredient) => value._id === ingredientId)[0];
};
