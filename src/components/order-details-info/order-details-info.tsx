import React, {useCallback, useMemo} from 'react';

import styles from './order-details-info.module.css';
import {PriceBlock} from "../price-block/price-block";
import {IngredientFeedView} from "../ingredient-feed-view/ingredient-feed-view";
import {parseDate, useOrderInfo, useSelector} from "../../utils/helpers";
import {TIngredient} from "../../utils/types";
import {OrderStatus} from "../../utils/constants";

const Ingredient = ({item, qty}: { item: TIngredient, qty: number}) => {
  const ingredientQty = item.type === "bun" ? 2 : qty;
  return (
    <div className={styles.ingredientWrapper}>
      <div className={styles.ingredientInfo}>
        <IngredientFeedView src={item.image_mobile} />
        <p className="text text_type_main-default ml-4">{item.name}</p>
      </div>
      <PriceBlock count={`${ingredientQty} x ${item.price}`} size="default" />
    </div>
  );
};

const getPrice = (data: Array<TIngredient>): number => {
  return data.reduce((sum: number, item) => {
    if (item.type === "bun") return sum + item.price * 2;
    return sum + item.price;
  }, 0);
};

export const OrderDetailsInfo = () => {
  const order = useOrderInfo();
  const { number, name, status, ingredients, createdAt} = order;

  const ingredientsInfo = useSelector(state => state.ingredients.items);
  const data = ingredientsInfo.filter(value => ingredients.includes(value._id));
  const uniqueData = Array.from(new Set(data));

  const price = useMemo(() => getPrice(data), [data]);

  const qty = useCallback((id: string) => {
    return ingredients.reduce((sum: number, item: string) => item === id ? sum + 1 : sum, 0);
  }, [ingredients]);

  return (
    <div className={styles.wrapper}>
      <p className="text text_type_digits-default mb-10">{`#${number}`}</p>
      <p className={`${styles.name} text text_type_main-medium mb-3`}>{name}</p>
      <p className={`${styles.status} ${status === "done" ? styles.done : ''} text text_type_main-small mb-15`}>{OrderStatus[status]}</p>
      <div className={`${styles.ingredients}`}>
        <h3 className={`${styles.title} text text_type_main-medium mb-6`}>Состав:</h3>
        <div className={`${styles.listWrapper} custom-scroll`}>
          {uniqueData.map(value => <Ingredient key={value._id} item={value} qty={qty(value._id)} />)}
        </div>
      </div>
      <div className={styles.secondaryInfo}>
        <p className="text text_type_main-default text_color_inactive">{parseDate(createdAt)}</p>
        <PriceBlock count={price} size="default" />
      </div>
    </div>
  );
};
