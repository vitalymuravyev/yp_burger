import React from 'react';

import styles from './ingredient.module.css';
import {IngredientDetails} from "../../components/ingredient-details/ingredient-details";

export const Ingredient = () => {

  return (
    <div className={styles.wrapper}>
      <IngredientDetails />
    </div>
  );
};
