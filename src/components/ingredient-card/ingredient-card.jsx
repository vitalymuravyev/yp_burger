import React from "react";

import styles from './ingredient-card.module.css';
import {PriceBlock} from "../price-block/price-block";
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";

export class IngredientCard extends React.Component {
  render() {
    const { image, price, name } = this.props;
    return (
      <div className={styles.card}>
        <img src={image} alt={name} />
        <PriceBlock count={price} size="default" className={styles.price} />
        <p className="text text_type_main-default name">{name}</p>
          <div className={styles.counter}>
              <Counter count={1} />
          </div>
      </div>
    )
  }
}
