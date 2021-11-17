import React from "react";
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';

import styles from './ingredients-list.module.css';

import { ingredientTypes } from '../../utils/data'
import {IngredientCard} from "../ingredient-card/ingredient-card";

export const IngredientsList = ({ data, type }) => {
  const ingredients = data.filter((item) => item.type === type);

  return (
    <div className={styles.wrapper}>
      <h3 className="text text_type_main-medium">{ingredientTypes[type]}</h3>
      <div className={styles.list}>
        {ingredients.map((item) =>
            <IngredientCard
                key={item._id}
                image={item.image}
                price={item.price}
                name={item.name}
            />
        )}
      </div>
    </div>
  )
}

IngredientsList.propTypes = {
  data: PropTypes.arrayOf(ingredientType),
  type: PropTypes.oneOf(['bun', 'sauce', 'main'])
}
