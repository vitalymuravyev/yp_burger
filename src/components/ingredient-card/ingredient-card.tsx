import React, { useMemo, FC } from "react";
import {useDrag} from "react-dnd";
import { Link, useLocation } from "react-router-dom";

import {Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector} from '../../utils/helpers';
import styles from './ingredient-card.module.css';
import {PriceBlock} from "../price-block/price-block";
import { TIngredient } from "../../utils/types";

type TIngredientCard = {
  item: TIngredient
}

export const IngredientCard: FC<TIngredientCard> = ({ item }) => {
  const location = useLocation();

  const { image, name, price, type } = item;
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item,
  });

  const burger = useSelector(state => state.burger);

  const counter = useMemo(() => {
    if (burger.bun && type === 'bun' && item._id === burger.bun._id) return 2;

    return burger.ingredients.filter((value: TIngredient) => value._id === item._id).length;
  }, [burger.bun, burger.ingredients, item._id, type]);

  return (
    <Link
      to={`/ingredients/${item._id}`}
      state={{ backgroundLocation: location }}
      className={styles.card}
      ref={dragRef}
      data-test-id="burger-ingredient"
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
