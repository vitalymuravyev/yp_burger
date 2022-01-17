import React, {useEffect, FC } from "react";
import { useInView } from "react-intersection-observer";

import { useSelector } from "react-redux";
import styles from './ingredients-list.module.css';

import { ingredientTypes } from '../../utils/constants';
import {IngredientCard} from "../ingredient-card/ingredient-card";
import {TIngredient, TIngredientTypeName} from "../../utils/types";

type TIngredientsList = {
  changeTab: (type: TIngredientTypeName, ratio?: number) => void;
  type: TIngredientTypeName;
  reference: any;
}

export const IngredientsList: FC<TIngredientsList> = ({ type, reference, changeTab }) => {

  const data: any = useSelector<any>(state => state.ingredients.items);
  const ingredients = data.filter((item: TIngredient) => item.type === type);

  const { ref, inView, entry } = useInView({
    threshold: [0, 0.25, 0.5, 0.75, 1]
  });

  useEffect(() => {
    const ratio = entry ? entry.intersectionRatio : 0;
    changeTab(type, ratio);
  }, [entry]);

  return (
    <div ref={reference}>
      <div className={styles.wrapper} ref={ref} >
        <h3 className="text text_type_main-medium" >{ingredientTypes[type]}</h3>
        <div className={styles.list}>
          {ingredients.map((item: TIngredient) =>
            <IngredientCard
              key={item._id}
              item={item}
            />
          )}
        </div>
      </div>
    </div>
  );
};
