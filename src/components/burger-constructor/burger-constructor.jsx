import React, {useCallback, useContext, useState} from "react";

import { Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';
import {PriceBlock} from "../price-block/price-block";
import {OrderDetails} from "../order-details/order-details";
import {BurgerContext} from "../../utils/appContext";
import {Modal} from "../modal/modal";

import {ERROR_MESSAGE_ORDER, EMPTY_ORDER, URL_ORDER} from "../../utils/constants";

export const BurgerConstructor = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [orderInfo, setOrderInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);

  const {burger} = useContext(BurgerContext);
  const bun = burger.bun;
  const ingredients = burger.ingredients;

  const postOrder = useCallback(() => {
    const data = {
      ingredients: [...ingredients.map((item) => item._id), bun._id]
    }

    fetch(URL_ORDER, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (res.status !== 200) {
          return Promise.reject(new Error(res.statusText));
        }
        return Promise.resolve(res);
      })
      .then(res => res.json())
      .then(result => setOrderInfo({
        name: result.name,
        id: result.order.number
      }))
      .then(() => setModalVisible(true))
      .catch((err) => setErrorMessage(true))
  }, [bun, ingredients])

  const handleButtonClick = () => {
    postOrder();
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  const closeError = () => {
    setErrorMessage(false);
  }

  if (!bun && ingredients.length === 0) {
    return (
      <section className={styles.wrapper}>
        <p className={`text text_type_main-medium ${styles.text}`}>
          {EMPTY_ORDER}
        </p>
      </section>
    )
  }

  return (
    <React.Fragment>
      <section className={styles.wrapper}>
        <div className={styles.container}>
          {bun && <div className={styles.item2}>
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
          {bun && <div className={styles.item2}>
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
      {modalVisible && <OrderDetails closeModal={closeModal} data={orderInfo} />}
      {errorMessage &&
        <Modal closeModal={closeError}>
          <p className="text text_type_main-large">
            {ERROR_MESSAGE_ORDER}
          </p>
        </Modal>
      }
    </React.Fragment>
  )
}
