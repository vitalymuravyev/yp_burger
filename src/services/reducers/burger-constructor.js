import update from 'immutability-helper';

import {ADD_BURGER_ITEM, DRAG_ITEM, REMOVE_BURGER_ITEM} from '../actions/burger-constructor';

const initialState = {
  bun: '',
  ingredients: [],
  counter: 0
};

export const burgerReducer = (state = initialState, action) => {
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
    default: {
      return state;
    }
  }
};
