import React from "react";

import styles from './burger-ingredients.module.css';
import {TabPanel} from "../tab-panel/tab-panel";
import {IngredientsList} from "../ingredients-list/ingredients-list";


export class BurgerIngredients extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <section className={styles.wrapper}>
        <h2 className="text text_type_main-large">Соберите бургер</h2>
        <TabPanel />
        <IngredientsList data={data} type="bun"/>
        <IngredientsList data={data} type="sauce"/>
      </section>
    )
  }
}