import { ADD_ITEM_INFO, REMOVE_ITEM_INFO } from '../actions/ingredient-card';

const initialValue = {
  details: {
    image_large: '',
    name: '',
    calories: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0
  },
  isDetailsVisible: false
};

export const ingredientCardReducer = (state = initialValue, action) => {
  switch (action.type) {
    case ADD_ITEM_INFO: {
      return {
        ...state,
        details: {
          ...action.payload,
        },
        isDetailsVisible: true
      };
    }
    case REMOVE_ITEM_INFO: {
      return {
        ...state,
        ...initialValue
      };
    }
    default: {
      return state;
    }
  }
};
