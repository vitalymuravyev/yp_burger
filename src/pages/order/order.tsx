import React, {useEffect} from 'react';

import {useLocation} from "react-router-dom";
import styles from './order.module.css';
import {OrderDetailsInfo} from "../../components/order-details-info/order-details-info";
import {useDispatch, useSelector} from "../../utils/helpers";
import { WS_CONNECTION_START, WS_PRIVATE_CONNECTION_START} from "../../services/actions/ws-action";

export const Order = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [, route, ] = location.pathname.split('/');
  const {wsConnectionLoading} = useSelector(state => state.wsOrders);

  useEffect(() => {
    if (route === 'feed') {
      dispatch({
        type: WS_CONNECTION_START
      });
    } else {
      dispatch({
        type: WS_PRIVATE_CONNECTION_START
      });
    }
  }, [dispatch, route]);

  if (!wsConnectionLoading) return (
    <p>
      Loading
    </p>
  );

  return (
    <div className={`${location.state ? '' : styles.margin} ${styles.wrapper} `}>
      <OrderDetailsInfo />
    </div>
  );
};
