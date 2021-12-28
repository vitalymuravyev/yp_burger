import { combineReducers } from 'redux';
import { ingredientsReducer } from './burger-ingredients';
import { ingredientCardReducer} from './ingredient-card';
import { burgerReducer } from './burger-constructor';
import { orderDetailsReducer } from './order-details';
import { userRegistrationReducer } from './user-registration';
import { userAuthReducer } from "./user-auth";
import { userProfileReducer } from "./user-profile";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientInfo: ingredientCardReducer,
  burger: burgerReducer,
  orderDetails: orderDetailsReducer,
  userRegistration: userRegistrationReducer,
  userAuth: userAuthReducer,
  userProfile: userProfileReducer,
});
