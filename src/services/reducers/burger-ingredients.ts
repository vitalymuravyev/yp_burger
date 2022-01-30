import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  CLOSE_ERROR, TGetItemsActions,
} from '../actions/burger-ingredients';
import {TIngredient} from "../../utils/types";

export type TBurgerIngredientState = {
  items: ReadonlyArray<TIngredient>;

  itemsRequest: boolean;
  itemsFailed: boolean;
}

const initialValue: TBurgerIngredientState = {
  items: [],

  itemsRequest: false,
  itemsFailed: false,
};

export const ingredientsReducer = (state = initialValue, action: TGetItemsActions) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true
      };
    }
    case GET_ITEMS_SUCCESS: {
      const itemsWithCounter = action.items.map(item => {
        return {...item, counter: 0};
      });
      return {
        ...state,
        itemsRequest: false,
        itemsFailed: false,
        items: itemsWithCounter
      };
    }
    case GET_ITEMS_FAILED: {
      return {
        ...state,
        ...initialValue,
        itemsFailed: true
      };
    }
    case CLOSE_ERROR: {
      return {
        ...state,
        itemsFailed: false
      };
    }
    default: {
      return state;
    }
  }
};
