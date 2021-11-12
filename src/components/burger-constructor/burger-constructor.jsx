import React from "react";

import {
  Button,
  ConstructorElement, CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'


import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ data }) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.list}>
        {data.map((item, index, arr) =>
          <ConstructorElement
            key={item._id}
            text={item.name}
            price={item.price}
            thumbnail={item.image}
            type={index === 0 ? "top" : index === arr.length - 1 ? 'bottom' : ''}
            isLocked={(index === 0 || index === arr.length - 1) && true}
          />
        )}
      </div>
      <div className={styles.order}>
        <span className={`text text_type_digits-medium ${styles.price}`}>
          610<CurrencyIcon type="primary" />
        </span>
        <Button size="large">Оформить заказ</Button>
      </div>
    </section>

  )
}