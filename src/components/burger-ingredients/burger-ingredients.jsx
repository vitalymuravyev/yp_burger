import React from "react";

import { ingredientType } from '../../utils/types';

import styles from './burger-ingredients.module.css';
import {TabPanel} from "../tab-panel/tab-panel";
import {IngredientsList} from "../ingredients-list/ingredients-list";
import PropTypes from "prop-types";


export const BurgerIngredients = ({ data }) => {
    return (
      <section className={styles.wrapper}>
        <h2 className="text text_type_main-large">Соберите бургер</h2>
        <TabPanel />
        <div className={styles.list}>
          <IngredientsList data={data} type="bun"/>
          <IngredientsList data={data} type="sauce"/>
          <IngredientsList data={data} type="main" />
        </div>
      </section>
    )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType)
}