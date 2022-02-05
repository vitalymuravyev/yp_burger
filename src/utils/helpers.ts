import {useLocation} from "react-router-dom";
import {
  format,
  isToday, isYesterday,
  parseISO,
} from 'date-fns';
import { ru } from 'date-fns/locale';
import {useSelector as useSelectorHook, TypedUseSelectorHook, useDispatch as useDispatchHook} from "react-redux";
import {TIngredient, RootState, AppThunk, AppDispatch, IOrderInfo} from "./types";
import {TBurger} from "../services/reducers/burger-constructor";

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
  return useSelector((state) =>
    state.ingredients.items).filter((value: TIngredient) => value._id === ingredientId)[0];
};

export const useOrderInfo = (): IOrderInfo => {
  const location = useLocation();
  const orderId = location.pathname.split('/')[location.pathname.split('/').length - 1];
  return useSelector((state) =>
    state.wsOrders.orders).filter((value: IOrderInfo) => value._id === orderId)[0];
};

export const getPrice = (newBurger: TBurger): number => {
  const price = newBurger.bun ? newBurger.bun.price * 2 : 0;
  return newBurger.ingredients.reduce((sum: number, item: TIngredient) => sum + item.price, price);
};

export const parseDate = (date: string): string => {
  // eslint-disable-next-line no-nested-ternary
  const day = !isToday(parseISO(date)) ? isYesterday(parseISO(date)) ? 'Вчера' : format(parseISO(date), "d MMMM", { locale: ru }) : 'Сегодня';
  return `${day}, ${format(parseISO(date), "HH:mm", { locale: ru })}, i-${format(parseISO(date), "O")}`;
};
