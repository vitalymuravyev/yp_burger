import React, {FC} from 'react';

import styles from './ingredient-feed-view.module.css';

type TIngredientFeedView = {
  style: {
    zIndex: number;
    left: number;
  }
}

export const IngredientFeedView: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <span>st</span>
      </div>
    </div>
  );
};
