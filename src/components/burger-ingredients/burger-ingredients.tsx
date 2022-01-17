import React, {useCallback, useMemo, useRef, useState} from "react";

import styles from './burger-ingredients.module.css';

import {TabPanel} from "../tab-panel/tab-panel";
import {IngredientsList} from "../ingredients-list/ingredients-list";
import {TIngredientTypeName} from "../../utils/types";


export const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState<TIngredientTypeName>('bun');

  const newTabRatio: { [key in TIngredientTypeName]: number } = useMemo(() => ({
    bun: 1,
    sauce: 0,
    main: 0
  }), []);

  const bunRef = useRef<HTMLDivElement>(null!);
  const sauceRef = useRef<HTMLDivElement>(null!);
  const mainRef = useRef<HTMLDivElement>(null!);

  const setTab = useCallback((tab) => {
    setCurrentTab(tab);
    switch (tab) {
      case 'bun': {
        bunRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'sauce': {
        sauceRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'main': {
        mainRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      default:
    }
  }, []);

  const setRatio = useCallback((type: TIngredientTypeName, ratio) => {
    newTabRatio[type] = ratio;
    if (currentTab !== type && newTabRatio[currentTab] < ratio) {
      setCurrentTab(type);
    }
  }, [currentTab, newTabRatio]);

  return (
    <section className={styles.wrapper}>
      <h2 className="text text_type_main-large">Соберите бургер</h2>
      <TabPanel setTab={setTab} currentTab={currentTab} />
      <div className={`${styles.list} custom-scroll`}>
        <IngredientsList type="bun" reference={bunRef} changeTab={setRatio} />
        <IngredientsList type="sauce" reference={sauceRef} changeTab={setRatio} />
        <IngredientsList type="main" reference={mainRef} changeTab={setRatio} />
      </div>
    </section>
  );
};
