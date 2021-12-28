import React, { useEffect } from 'react';
import {useDispatch } from "react-redux";

import styles from './ingredient.module.css';
import {IngredientDetails} from "../../components/ingredient-details/ingredient-details";
import {ADD_ITEM_INFO} from "../../services/actions/ingredient-card";
import {useIngredientInfo} from "../../utils/helpers";

export const Ingredient = () => {
  const dispatch = useDispatch();
  const item = useIngredientInfo();

  useEffect(() => {
    dispatch({
      type: ADD_ITEM_INFO,
      payload: item
    });
  }, [dispatch, item]);

  return (
    <div className={styles.wrapper}>
      <IngredientDetails />
    </div>
  );
};
