import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients';
import { ingredientCardReducer} from './ingredient-card';
import { burgerReducer } from './burger-constructor';
import { orderDetailsReducer } from './order-details';
import { userRegistrationReducer } from './user-registration';
import { userLoginReducer } from "./user-login";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientInfo: ingredientCardReducer,
  burger: burgerReducer,
  orderDetails: orderDetailsReducer,
  userRegistration: userRegistrationReducer,
  userLogin: userLoginReducer
});
