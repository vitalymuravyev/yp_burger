import React, {FC} from 'react';

import styles from './ingredient-feed-view.module.css';

type TIngredientFeedView = {
  src: string;
  difference: number;
}

export const IngredientFeedView: FC<TIngredientFeedView> = ({ src, difference }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <img  src={src} alt="" className={styles.picture}/>
      </div>
    </div>
  );
};
