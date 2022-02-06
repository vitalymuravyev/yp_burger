import React, {FC, useMemo} from 'react';

import styles from './order-status-feed.module.css';
import {useSelector} from "../../utils/helpers";
import {IOrderInfo} from "../../utils/types";

const TOTAL_TITLE = 'Выполнено за все время:';
const TODAY_TOTAL_TITLE = 'Выполнено за сегодня:';

interface IOrderListProps {
  title: string;
  data: number[];
  accent?: boolean;
}


const OrdersList: FC<IOrderListProps> = ({title, data, accent = false} )=> {
  return (
    <div className={styles.orderlistWrapper}>
      <h3 className="mb-6 text text_type_main-medium">{title}</h3>
      <ul className={`${styles.orderlist} `}>
        {data.map((item, index) =>
          <span
            className={`text text_type_digits-default mb-2 ${accent ? styles.accent : ''}`}
            key={`${index}${item}`}
          >{item}</span>)}
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

const getFiltredOrders = (orders: IOrderInfo[], status: 'done' | 'pending' | 'created'): number[] => {
  return orders.filter(value => value.status === status).map(item => item.number).slice(0, 20);
};

export const OrderStatusFeed = () => {
  const { orders, total, totalToday } = useSelector(state => state.wsOrders);

  const readyOrders = useMemo(() => getFiltredOrders(orders, 'done'), [orders]);
  const pendingOrders = useMemo(() => getFiltredOrders(orders, 'pending'), [orders]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.status}>
        <OrdersList title='Готовы:' data={readyOrders} accent />
        <OrdersList title='В работе:' data={pendingOrders} />
      </div>
      <OrdersNumber title={TOTAL_TITLE} number={total} />
      <OrdersNumber title={TODAY_TOTAL_TITLE} number={totalToday} />
    </section>
  );
};
