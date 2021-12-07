import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients';
import { ingredientCardReducer} from './ingredient-card';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientInfo: ingredientCardReducer,
});
