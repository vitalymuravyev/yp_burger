import React from 'react';

import styles from './order-details-info.module.css';
import {PriceBlock} from "../price-block/price-block";
import {IngredientFeedView} from "../ingredient-feed-view/ingredient-feed-view";

const Ingredient = () => {
  return (
    <div className={styles.ingredientWrapper}>
      <div className={styles.ingredientInfo}>
        <IngredientFeedView />
        <p className="text text_type_main-default ml-4">Флюоресцентная булка R2-D3</p>
      </div>
      <PriceBlock count="2 x 20" size="default" />
    </div>
  );
};

export const OrderDetailsInfo = () => {
  return (
    <div className={styles.wrapper}>
      <p className="text text_type_main-default mb-10">#034533</p>
      <p className="text text_type_main-medium mb-3">Black Hole Singularity острый бургер</p>
      <p className="text text_type_main-small mb-15">Выполнен</p>
      <div className={`${styles.ingredients} custom-scroll`}>
        <h3 className="text text_type_main-medium mb-6">Состав:</h3>
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
        <Ingredient />
      </div>
      <div className={styles.secondaryInfo}>
        <p className="text text_type_main-default text_color_inactive">Вчера, 13:50 i-GMT+3</p>
        <PriceBlock count={510} size="default" />
      </div>
    </div>
  );
};
