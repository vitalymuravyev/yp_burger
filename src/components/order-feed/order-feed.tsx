import React from 'react';
import styles from './order-feed.module.css';
import {OrderInfo} from "../order-info/order-info";
import {useSelector} from "../../utils/helpers";

export const OrderFeed = () => {
  const { orders } = useSelector(state => state.wsOrders);
  console.log(orders);
  return (
    <section className={styles.wrapper}>
      <h2 className="text text_type_main-large">Лента заказов</h2>
      <ul className={`${styles.list} custom-scroll`}>
        <OrderInfo />
      </ul>
    </section>
  );
};
