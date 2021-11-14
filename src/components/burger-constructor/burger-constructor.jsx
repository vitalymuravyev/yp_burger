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
        {data.map((item, index, arr) => {
            const type = index === 0 ? "top" : index === arr.length - 1 ? 'bottom' : '';
            const isLocked = index === 0 || index === arr.length - 1;
            const additionalText = index === 0 ? "(верх)" : index === arr.length - 1 ? '(низ)' : '';
            const text = `${item.name} ${additionalText}`
            return (
                <li key={item._id} className={styles.item}>
                    {!isLocked && <DragIcon type="primary"/>}
                    <ConstructorElement
                        text={text}
                        price={item.price}
                        thumbnail={item.image}
                        type={type}
                        isLocked={isLocked}
                    />
                </li>
            )
        }
        )}
      </ul>
      <div className={styles.order}>
          <PriceBlock count={610} size="medium" />
        <Button size="large">Оформить заказ</Button>
      </div>
    </section>

  )
}
