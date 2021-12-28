import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

export const isActivePath = (currentPath, pathname) => {
  return currentPath === pathname;
};

export const checkResponseStatus = (response) => {
  if (!response.ok) {
    return Promise.reject(new Error(response.statusText));
  }
  return Promise.resolve(response);
};

export const useIngredientInfo = () => {
  const location = useLocation();
  const ingredientId = location.pathname.split('/')[2];
  return useSelector(state => state.ingredients.items).filter(value => value._id === ingredientId)[0];
};
