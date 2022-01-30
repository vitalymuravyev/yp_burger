import {TIngredient} from "../../utils/types";

export const ADD_BURGER_ITEM = 'ADD_BURGER_ITEM';
export const REMOVE_BURGER_ITEM = 'REMOVE_BURGER_ITEM';
export const RESET_BURGER = 'RESET_BURGER';

export const DRAG_ITEM = 'DRAG_ITEM';

interface IAddBurgerItemAction {
  readonly type: typeof ADD_BURGER_ITEM;
  payload: TIngredient;
}

interface IRemoveBurgerItemAction {
  readonly type: typeof REMOVE_BURGER_ITEM;
  item: TIngredient;
}

interface IDragBurgerItemAction {
  readonly type: typeof DRAG_ITEM;
  dragIndex: number;
  hoverIndex: number;
  dragItem: TIngredient
}

interface IResetBurgerAction {
  readonly type: typeof RESET_BURGER;
}


export type TBurgerActions = IAddBurgerItemAction |
  IRemoveBurgerItemAction |
  IDragBurgerItemAction |
  IResetBurgerAction;
