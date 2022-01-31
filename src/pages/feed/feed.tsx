import React from 'react';

import styles from './feed.module.css';
import {OrderFeed} from "../../components/order-feed/order-feed";
import {OrderStatusFeed} from "../../components/order-status-feed/order-status-feed";


const tempData = [
  {
    createdAt: "2022-01-31T06:15:15.146Z",
    ingredients: ["60d3b41abdacab0026a733c8", "60d3b41abdacab0026a733c7"],
    name: "Флюоресцентный люминесцентный бургер",
    number: 9084,
    status: "done",
    updatedAt: "2022-01-31T06:15:15.429Z",
    _id: "61f77e736d7cd8001b2d31a3",
  }
];

export const Feed = () => {
  return (
    <main className={styles.main}>
      <OrderFeed />
      <OrderStatusFeed />
    </main>
  );
};
