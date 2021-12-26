import React, {useCallback, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from 'prop-types';
import {useDrag} from "react-dnd";
import { Link, useLocation } from "react-router-dom";

import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredient-card.module.css';
import {PriceBlock} from "../price-block/price-block";
import {ingredientType} from "../../utils/types";
import {ADD_ITEM_INFO} from "../../services/actions/ingredient-card";

export const IngredientCard = ({ item }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { image, name, price, type } = item;
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item,
  });

  const burger = useSelector(state => state.burger);

  const counter = useMemo(() => {
    if (type === 'bun' && item._id === burger.bun._id) return 2;

    return burger.ingredients.filter(value => value._id === item._id).length;
  }, [burger.bun._id, burger.ingredients, item._id, type]);

  const handleItemClick = useCallback((ingredient) => {
    dispatch({
      type: ADD_ITEM_INFO,
      payload: ingredient
    });
  }, [dispatch]);

  return (
    <Link
      to={`/ingredients/${item._id}`}
      state={{ backgroundLocation: location }}
      className={styles.card}
      ref={dragRef}
      onClick={() => handleItemClick(item)}
    >
      <img src={image} alt={name} />
      <PriceBlock count={price} size="default" className={styles.price} />
      <p className="text text_type_main-default name">{name}</p>
        {counter > 0 && (<div className={styles.counter}>
          <Counter count={counter}/>
        </div>)}
    </Link>
  );
};

IngredientCard.propTypes = {
  item: ingredientType.isRequired,
};
