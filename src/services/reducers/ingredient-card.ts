import {
  ADD_ITEM_INFO,
  REMOVE_ITEM_INFO,
  ADD_ITEM_INFO_PAGE,
  TIngredientInfoActions
} from '../actions/ingredient-card';
import {IIngredientDetails} from "../../utils/types";

export type TIngredientInfoState = {
  details: IIngredientDetails;
  isDetailsVisible: boolean;
}

const initialValue: TIngredientInfoState = {
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

export const ingredientCardReducer = (state = initialValue, action: TIngredientInfoActions) => {
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
    case ADD_ITEM_INFO_PAGE: {
      return {
        ...state,
        details: {
          ...action.payload,
        }
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
