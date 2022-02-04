import React, { FC } from 'react';

import styles from './ingredients-preview.module.css';
import {IngredientFeedView} from "../ingredient-feed-view/ingredient-feed-view";
import {TIngredient} from "../../utils/types";

type IngredientsPreview = {
  list: TIngredient[];
}

export const IngredientsPreview: FC<IngredientsPreview> = ({list}) => {
  const rightList = list.length > 6 ? list.slice(0, 6) : list;
  const difference = list.length > 6 ? list.length - 6 : 0;
  return (
    <React.Fragment>
      <ul className={styles.wrapper}>
        {rightList.map((item, index) =>
          <li key={item._id}  style={{zIndex: 6 - index, left: 48 * index, position: "absolute"}}>
            <IngredientFeedView src={item.image_mobile} difference={difference} />
          </li>
        )}
      </ul>
      {/* <span>{difference && difference}</span> */}
    </React.Fragment>

  );
};
