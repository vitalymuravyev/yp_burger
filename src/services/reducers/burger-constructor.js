import { ADD_BURGER_ITEM, REMOVE_BURGER_ITEM} from '../actions/burger-constructor';

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
        ingredients:
          [...state.ingredients.filter(item => item.orderIndex !== action.item.orderIndex)]
      };
    }
    default: {
      return state;
    }
  }
};
