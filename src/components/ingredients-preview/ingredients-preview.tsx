import React, { FC } from 'react';

import styles from './ingredients-preview.module.css';
import {IngredientFeedView} from "../ingredient-feed-view/ingredient-feed-view";

type IngredientsPreview = {
  items: string[];
}

export const IngredientsPreview: FC<IngredientsPreview> = ({items}) => {
  return (
    <ul className={styles.wrapper}>
      {items.map((item, index) =>
        <li key={index}  style={{zIndex: 6 - index, left: 48 * index, position: "absolute"}}>
          <IngredientFeedView />
        </li>
      )}
    </ul>
  );
};
