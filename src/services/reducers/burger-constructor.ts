import update from 'immutability-helper';

import {
  ADD_BURGER_ITEM,
  DRAG_ITEM,
  REMOVE_BURGER_ITEM,
  RESET_BURGER,
  TBurgerActions
} from '../actions/burger-constructor';
import {TIngredient} from "../../utils/types";

export type TBurger = {
  bun: TIngredient | '';
  ingredients: Array<TIngredient>;
  counter: number;
}

const initialState: TBurger = {
  bun: '',
  ingredients: [],
  counter: 0
};

export const burgerReducer = (state = initialState, action: TBurgerActions) => {
  switch (action.type) {
    case ADD_BURGER_ITEM: {
      if (action.payload.type === 'bun') {
        return {
          ...state,
          bun: action.payload
        };
      }

      return {
        ...state,
        ingredients: [
          ...state.ingredients, {...action.payload, orderIndex: state.counter}
        ],
        counter: state.counter + 1,
      };
    }
    case REMOVE_BURGER_ITEM: {
      return {
        ...state,
        ingredients: state.ingredients.filter(item => item.orderIndex !== action.item.orderIndex)
      };
    }

    case DRAG_ITEM: {
      return {
        ...state,
        ingredients:
          update(state.ingredients, {
            $splice: [
              [action.dragIndex, 1],
              [action.hoverIndex, 0, action.dragItem]
            ]
          })
      };
    }
    case RESET_BURGER: {
      return {
        ...state,
        ...initialState
      };
    }
    default: {
      return state;
    }
  }
};
