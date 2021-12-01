import React, {useContext, useState} from "react";
import PropTypes from "prop-types";

import { Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';
import {PriceBlock} from "../price-block/price-block";
import {OrderDetails} from "../order-details/order-details";
import {BurgerContext} from "../../utils/appContext";

export const BurgerConstructor = () => {
  const {burger} = useContext(BurgerContext);
  console.log(burger)
  const bun = burger.bun;
  const [modalVisible, setModalVisible] = useState(false);

  const ingredients = burger.ingredients;

  const handleButtonClick = () => {
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  if (!bun && ingredients.length === 0) {
    return (
      <section className={styles.wrapper}>
        <p className="text text_type_main-medium">
          Пока в вашем бургере ничего нет. Обязательно добавьте побольше всего вкусного
        </p>
      </section>
    )
  }

  return (
    <React.Fragment>
      <section className={styles.wrapper}>
        <div className={styles.container}>
          {bun && <div className={styles.item}>
            <ConstructorElement
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
              type="top"
              isLocked
            />
          </div>}
          <ul className={`${styles.list} custom-scroll`}>
            {ingredients && ingredients.map((item, index, arr) => {
                return (
                  <li key={item._id + index} className={styles.item}>
                    {<DragIcon type="primary"/>}
                    <ConstructorElement
                      text={item.name}
                      price={item.price}
                      thumbnail={item.image}
                    />
                  </li>
                )
              }
            )}
          </ul>
          {bun && <div className={styles.item}>
            <ConstructorElement
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
              type="bottom"
              isLocked
            />
          </div>}
        </div>
        <div className={styles.order}>
          <PriceBlock count={burger.price} size="medium" />
          <Button size="large" onClick={handleButtonClick}>Оформить заказ</Button>
        </div>
      </section>
      {modalVisible && <OrderDetails closeModal={closeModal}/>}
    </React.Fragment>
  )
}

BurgerConstructor.propTypes = {
}
