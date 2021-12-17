import React from 'react';

import styles from './not-found.module.css';

export const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <p className="text text_type_main-medium text_color_inactive">
        Страница не найдена!
      </p>
      <p className="text text_type_main-medium text_color_inactive mt-1">
        Похоже ее съели вместо бургера =)
      </p>
    </div>
  );
};
