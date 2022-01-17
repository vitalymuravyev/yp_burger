import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {TIngredient} from "./types";

export const isActivePath = (currentPath: string, pathname: string): boolean => {
  return currentPath === pathname;
};

interface CustomBody<T> extends Body {
  json(): Promise<T>;
}

type TResponseBody = {
  success: boolean;

  message?: string;
  headers?: Headers;
};

interface IResponse<T> extends CustomBody<T> {
  readonly type: ResponseType;
  readonly ok: boolean;
  readonly statusText: string;
  readonly url: string;
  readonly headers: Headers;
  readonly redirected: boolean;
}

export const checkResponseStatus = (response: IResponse<TResponseBody>) => {
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
