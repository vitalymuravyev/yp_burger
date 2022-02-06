import {IIngredientDetails} from "../../utils/types";

export const ADD_ITEM_INFO = 'ADD_ITEM_INFO';
export const REMOVE_ITEM_INFO = 'REMOVE_ITEM_INFO';
export const ADD_ITEM_INFO_PAGE = 'ADD_ITEM_INFO_PAGE';

interface IAddItemInfoAction {
 readonly type: typeof ADD_ITEM_INFO;
 readonly payload: IIngredientDetails
}

interface IRemoveItemInfoAction {
  readonly type: typeof REMOVE_ITEM_INFO;
}

interface IAddItemInfoPageAction {
  readonly type: typeof ADD_ITEM_INFO_PAGE;
  readonly payload: IIngredientDetails
}

export type TIngredientInfoActions =
  IAddItemInfoAction
  | IRemoveItemInfoAction
  | IAddItemInfoPageAction;
