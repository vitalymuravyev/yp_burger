import React from "react";
import PropTypes from "prop-types";

import styles from './ingredient-details.module.css';

import {Modal} from "../modal/modal";
import {ingredientType} from "../../utils/types";

export const IngredientDetails = ({ closeModal, data}) => {
  return (
    <Modal closeModal={closeModal}>
      <h3 className={`text text_type_main-large pt-3 pb-3 ${styles.heading}`}>
        Детали ингредиента
      </h3>
      <div className={styles.card}>
        <img src={data.image_large} alt={data.name} />
        <p className="text text_type_main-medium mt-4">{data.name}</p>
        <ul className={`mt-8 mb-5 ${styles.nutrition}`}>
          <li className={`${styles.nutrition_item}`}>
            <span className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</span>
            <span className="text text_type_digits-default text_color_inactive">{data.calories}</span>
          </li>
          <li className={`${styles.nutrition_item}`}>
            <span className="text text_type_main-default text_color_inactive mb-2">Белки, г</span>
            <span className="text text_type_digits-default text_color_inactive">{data.proteins}</span>
          </li>
          <li className={`${styles.nutrition_item}`}>
            <span className="text text_type_main-default text_color_inactive mb-2">Жиры, г</span>
            <span className="text text_type_digits-default text_color_inactive">{data.fat}</span>
          </li>
          <li className={`${styles.nutrition_item}`}>
            <span className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</span>
            <span className="text text_type_digits-default text_color_inactive">{data.carbohydrates}</span>
          </li>
        </ul>
      </div>
    </Modal>
  )
}

IngredientDetails.propTypes = {
  closeModal: PropTypes.func,
  data: ingredientType.isRequired
}
