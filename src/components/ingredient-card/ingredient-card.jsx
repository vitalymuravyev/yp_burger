import React from "react";
import PropTypes from 'prop-types';

import styles from './ingredient-card.module.css';
import {PriceBlock} from "../price-block/price-block";
import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";

export const IngredientCard = ({ image, price, name }) => {
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

IngredientCard.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}
