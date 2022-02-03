import React, {FC, useEffect} from 'react';

import styles from './feed.module.css';
import {OrderFeed} from "../../components/order-feed/order-feed";
import {OrderStatusFeed} from "../../components/order-status-feed/order-status-feed";
import {useDispatch} from "../../utils/helpers";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../services/actions/ws-action";

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSED
      });
    };
  }, []);
  return (
    <main className={styles.main}>
      <OrderFeed />
      <OrderStatusFeed />
    </main>
  );
};
