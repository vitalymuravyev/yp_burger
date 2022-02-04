import React from 'react';

import styles from './order-status-feed.module.css';
import {useSelector} from "../../utils/helpers";

const TOTAL_TITLE = 'Выполнено за все время:';
const TODAY_TOTAL_TITLE = 'Выполнено за сегодня:';


const OrdersList = (props: {title: string, data: number[]} )=> {
  const {title, data} = props;

  return (
    <div className={styles.orderlistWrapper}>
      <h3 className="mb-6 text text_type_main-medium">{title}</h3>
      <ul className={styles.orderlist}>
        {data.map((item, index) =>
          <span className="text text_type_digits-default mb-2" key={`${index}${item}`}>{item}</span>)}
      </ul>
    </div>
  );
};

const OrdersNumber = (props: {title: string, number: number}) => {
  const { title, number } = props;
  return (
    <div className={styles.ordersNumberWrapper}>
      <h3 className="text text_type_main-medium">
        {title}
      </h3>
      <p className="text text_type_digits-large">
        {number}
      </p>
    </div>
  );
};

export const OrderStatusFeed = () => {
  const { orders, total, totalToday } = useSelector(state => state.wsOrders);

  const readyOrders = orders.filter(value => value.status === 'done').map(item => item.number);
  const pendingOrders = orders.filter(value => value.status === 'pending').map(item => item.number);

  return (
    <section className={styles.wrapper}>
      <div className={styles.status}>
        <OrdersList title='Готовы:' data={readyOrders} />
        <OrdersList title='В работе' data={pendingOrders} />
      </div>
      <OrdersNumber title={TOTAL_TITLE} number={total} />
      <OrdersNumber title={TODAY_TOTAL_TITLE} number={totalToday} />
    </section>
  );
};
