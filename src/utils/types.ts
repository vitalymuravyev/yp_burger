import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from 'redux';
import { store } from "../index";
import { TBurgerActions } from "../services/actions/burger-constructor";
import { TOrderDetailsActions } from "../services/actions/order-details";
import { TGetItemsActions } from "../services/actions/burger-ingredients";
import {TUserAuthActions} from "../services/actions/user-auth";
import {TUserProfileActions} from "../services/actions/user-profile";
import {TUserRegistrationActions} from "../services/actions/user-registration";
import {TIngredientInfoActions} from "../services/actions/ingredient-card";

export type TApplicationActions =
  TBurgerActions
  | TOrderDetailsActions
  | TGetItemsActions
  | TUserAuthActions
  | TUserProfileActions
  | TUserRegistrationActions
  | TIngredientInfoActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void > = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

export type TIngredientTypeName = 'bun' | 'sauce' | 'main';


export interface TIngredient {
  _id: string;
  name: string;
  type: TIngredientTypeName;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;

  orderIndex?: number;
}

export interface IIngredientDetails {
  image_large: string;
  name: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}

export interface IUserInfo {
  email: string;
  name: string;
  password?: string;
}

export type TUserWithoutName = Omit<IUserInfo, 'name'>

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: TUserWithoutName;
}
