import React from "react";
import {useSelector} from "react-redux";

import styles from './ingredient-details.module.css';

export const IngredientDetails = () => {
  const { image_large, name, calories, proteins, fat, carbohydrates }
    = useSelector(state => state.ingredientInfo.details);

  return (
    <div>
      <h3 className={`text text_type_main-large pt-3 pb-3 ${styles.heading}`}>
        Детали ингредиента
      </h3>
      <div className={styles.card}>
        <img src={image_large} alt={name} />
        <p className="text text_type_main-medium mt-4">{name}</p>
        <ul className={`mt-8 mb-5 ${styles.nutrition}`}>
          <li className={`${styles.nutrition_item}`}>
            <span className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</span>
            <span className="text text_type_digits-default text_color_inactive">{calories}</span>
          </li>
          <li className={`${styles.nutrition_item}`}>
            <span className="text text_type_main-default text_color_inactive mb-2">Белки, г</span>
            <span className="text text_type_digits-default text_color_inactive">{proteins}</span>
          </li>
          <li className={`${styles.nutrition_item}`}>
            <span className="text text_type_main-default text_color_inactive mb-2">Жиры, г</span>
            <span className="text text_type_digits-default text_color_inactive">{fat}</span>
          </li>
          <li className={`${styles.nutrition_item}`}>
            <span className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</span>
            <span className="text text_type_digits-default text_color_inactive">{carbohydrates}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
