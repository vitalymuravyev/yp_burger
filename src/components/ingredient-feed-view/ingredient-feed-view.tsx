import React, {FC} from 'react';

import styles from './ingredient-feed-view.module.css';

type TIngredientFeedView = {
  src: string;
  difference?: number;
}

export const IngredientFeedView: FC<TIngredientFeedView> = ({ src, difference= 0 }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <img  src={src} alt="" className={styles.picture}/>
        {difference !== 0 && <span className={`${styles.text} text text_type_main-default`}>+3</span>}
      </div>
    </div>
  );
};
