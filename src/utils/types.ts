import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from 'redux';
import { store } from "../services/store";
import { TBurgerActions } from "../services/actions/burger-constructor";
import { TOrderDetailsActions } from "../services/actions/order-details";
import { TGetItemsActions } from "../services/actions/burger-ingredients";
import {TUserAuthActions} from "../services/actions/user-auth";
import {TUserProfileActions} from "../services/actions/user-profile";
import {TUserRegistrationActions} from "../services/actions/user-registration";
import {TIngredientInfoActions} from "../services/actions/ingredient-card";
import {
  TWsConnectionActions, WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE,
  WS_PRIVATE_CONNECTION_START
} from "../services/actions/ws-action";

export type TApplicationActions =
  TBurgerActions
  | TOrderDetailsActions
  | TGetItemsActions
  | TUserAuthActions
  | TUserProfileActions
  | TUserRegistrationActions
  | TIngredientInfoActions
  | TWsConnectionActions;

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

export interface IOrderInfo {
  status: 'created' | 'pending' | 'done';
  ingredients: string[];
  _id: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface IWsOrdersResponse {
  success: boolean;
  orders: Array<IOrderInfo>;
  total: number;
  totalToday: number;
}

export interface IWsMiddlewareActions {
  wsStart: typeof WS_CONNECTION_START;
  wsPrivateStart: typeof WS_PRIVATE_CONNECTION_START;
  wsOpen: typeof WS_CONNECTION_SUCCESS;
  wsError: typeof WS_CONNECTION_ERROR;
  wsClose: typeof WS_CONNECTION_CLOSED;
  wsMessage: typeof WS_GET_MESSAGE;
}
