import { ADD_BURGER_ITEM, REMOVE_BURGER_ITEM} from '../actions/burger-constructor';

const initialState = {
  bun: '',
  ingredients: [],
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
        ingredients: [...state.ingredients, action.payload]
      };
    }
    case REMOVE_BURGER_ITEM: {
      return {
        ...state,
        ingredients:
          [...state.ingredients.filter(item => item._id !== action.item._id)]
      };
    }
    default: {
      return state;
    }
  }
};
