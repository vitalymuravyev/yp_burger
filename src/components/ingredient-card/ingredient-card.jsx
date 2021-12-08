import React from "react";
import PropTypes from 'prop-types';
import {useDrag} from "react-dnd";

import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient-card.module.css';
import {PriceBlock} from "../price-block/price-block";
import {ingredientType} from "../../utils/types";

export const IngredientCard = ({ onClick, item }) => {
  const { image, name, price } = item;
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item,
  });


  return (
    <div className={styles.card} onClick={onClick} ref={dragRef} >
      <img src={image} alt={name} />
      <PriceBlock count={price} size="default" className={styles.price} />
      <p className="text text_type_main-default name">{name}</p>
        {/* <div className={styles.counter}> */}
        {/*    <Counter count={1} /> */}
        {/* </div> */}
    </div>
  );
};

IngredientCard.propTypes = {
  item: ingredientType.isRequired,
  onClick: PropTypes.func.isRequired,

};
