import React, {FC, useMemo} from 'react';

import {Link, useLocation} from "react-router-dom";
import styles from './order-info.module.css';
import {PriceBlock} from "../price-block/price-block";
import {IngredientsPreview} from "../ingredients-preview/ingredients-preview";
import {IOrderInfo, TIngredient} from "../../utils/types";
import {useSelector} from "../../utils/helpers";

interface Props {
  order: IOrderInfo
}

const getPrice = (data: Array<TIngredient>): number => {
  return data.reduce((sum: number, item) => {
    if (item.type === "bun") return sum + item.price * 2;
    return sum + item.price;
  }, 0);
};

export const OrderInfo: FC<Props> = ({ order }) => {
  const location = useLocation();
  const { number, name, createdAt, ingredients, _id } = order;
  const ingredientsInfo = useSelector(state => state.ingredients.items);

  const data = ingredientsInfo.filter(value => ingredients.includes(value._id));
  const price = useMemo(() => getPrice(data), [data]);
  
  return (
    <Link
      to={`/feed/${_id}`}
      state={{ backgroundLocation: location }}
      className={`${styles.wrapper} p-6`}
    >
      <div className={`${styles.mainInfo} pb-6`}>
        <span className="text text_type_digits-default">
          {`#${number}`}
        </span>
        <span className="text text_type_main-default text_color_inactive">
         {createdAt}
        </span>
      </div>
      <h3 className="text text_type_main-medium">{name}</h3>
      <div className={`${styles.secondInfo} pt-6`}>
        <IngredientsPreview list={data} />
        <PriceBlock count={price} size="default" />
      </div>
    </Link>
  );
};
