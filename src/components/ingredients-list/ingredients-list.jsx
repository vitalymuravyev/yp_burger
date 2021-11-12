import React from "react";

import styles from './ingredients-list.module.css';

import { ingredientTypes } from '../../utils/data'

export class IngredientsList extends React.Component {
  render() {
    const { data, type } = this.props;

    const ingredients = data.filter((item) => item.type === type);
    return (
      <div className={styles.wrapper}>
        <h3 className="text text_type_main-medium">{ingredientTypes[type]}</h3>
        {ingredients.map((item) =>
          <div key={item._id}>{item.name}</div>
        )}
      </div>
    )
  }
}