import React from "react";

import styles from './burger-ingredients.module.css';

import {TabPanel} from "../tab-panel/tab-panel";
import {IngredientsList} from "../ingredients-list/ingredients-list";


export const BurgerIngredients = () => {
  return (
    <section className={styles.wrapper}>
      <h2 className="text text_type_main-large">Соберите бургер</h2>
      <TabPanel />
      <div className={`${styles.list} custom-scroll`}>
        <IngredientsList type="bun"/>
        <IngredientsList type="sauce"/>
        <IngredientsList type="main" />
      </div>
    </section>
  );
};
