import React from 'react';

import styles from './order-info.module.css';
import {PriceBlock} from "../price-block/price-block";
import {IngredientsPreview} from "../ingredients-preview/ingredients-preview";

const fd = ['1', '2', '3', '4', '5'];

export const OrderInfo = () => {
  return (
    <li className={`${styles.wrapper} p-6`}>
      <div className={`${styles.mainInfo} pb-6`}>
        <span className="text text_type_digits-default">
          #034535
        </span>
        <span className="text text_type_main-default text_color_inactive">
          Сегодня, 16:20 i-GMT+3
        </span>
      </div>
      <h3 className="text text_type_main-medium">Death Star Starship Main бургер</h3>
      <div className={`${styles.secondInfo} pt-6`}>
        <IngredientsPreview items={fd} />
        <PriceBlock count={560} size="default" />
      </div>
    </li>
  );
};
