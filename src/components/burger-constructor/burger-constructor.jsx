import React from "react";

import {
    Button,
    ConstructorElement, DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'


import styles from './burger-constructor.module.css';
import {PriceBlock} from "../price-block/price-block";

export const BurgerConstructor = ({ data }) => {
  return (
    <section className={styles.wrapper}>
      <ul className={styles.list}>
        {data.map((item, index, arr) =>
          <li key={item._id} className={styles.item}>
              {(index !== 0 && index !== arr.length - 1) && <DragIcon type="primary"/>}
              <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  type={index === 0 ? "top" : index === arr.length - 1 ? 'bottom' : ''}
                  isLocked={(index === 0 || index === arr.length - 1) && true}
              />
          </li>
        )}
      </ul>
      <div className={styles.order}>
          <PriceBlock count={610} size="medium" />
        <Button size="large">Оформить заказ</Button>
      </div>
    </section>

  )
}
