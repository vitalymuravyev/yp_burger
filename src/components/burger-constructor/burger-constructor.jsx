import React, {useState} from "react";
import PropTypes from "prop-types";

import { ingredientType } from '../../utils/types';

import {
    Button,
    ConstructorElement, DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';
import {PriceBlock} from "../price-block/price-block";
import {OrderDetails} from "../order-details/order-details";

export const BurgerConstructor = ({ data }) => {
  const bun = data[0] || {};
  const [modalVisible, setModalVisible] = useState(false);

  const filteredData = data.filter((item) => item.type !== 'bun');

  const totalCost = filteredData.reduce((sum, item) => sum + item.price, 0) + (bun.price * 2);

  const handleButtonClick = () => {
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  return (
    <React.Fragment>
      <section className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.item}>
            <ConstructorElement
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
              type="top"
              isLocked
            />
          </div>
          <ul className={`${styles.list} custom-scroll`}>
            {filteredData.map((item, index, arr) => {
                return (
                  <li key={item._id} className={styles.item}>
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
          <div className={styles.item}>
            <ConstructorElement
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
              type="bottom"
              isLocked
            />
          </div>
        </div>
        <div className={styles.order}>
          <PriceBlock count={totalCost} size="medium" />
          <Button size="large" onClick={handleButtonClick}>Оформить заказ</Button>
        </div>
      </section>
      {modalVisible && <OrderDetails closeModal={closeModal}/>}
    </React.Fragment>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
}
