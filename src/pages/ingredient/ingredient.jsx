import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import styles from './ingredient.module.css';
import {IngredientDetails} from "../../components/ingredient-details/ingredient-details";
import {ADD_ITEM_INFO_PAGE} from "../../services/actions/ingredient-card";
import { getItems } from "../../services/actions/burger-ingredients";

export const Ingredient = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const ingredientId = location.pathname.split('/')[2];

  useEffect(() => {
    dispatch(getItems());
  }, []);

  const items = useSelector(state => state.ingredients.items).filter(value => value._id === ingredientId);
  console.log(items);
  useEffect(() => {
    dispatch({
      type: ADD_ITEM_INFO_PAGE,
      payload: items[0]
    });
  }, [dispatch, items]);

  return (
    <div className={styles.wrapper}>
      <IngredientDetails />
    </div>
  );
};
