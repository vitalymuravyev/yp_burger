import React, {useCallback, useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";
import styles from './user-orders.module.css';
import {isActivePath, useDispatch, useSelector} from "../../utils/helpers";
import {logoutUser} from "../../services/actions/user-auth";
import {OrderInfo} from "../../components/order-info/order-info";
import {WS_CONNECTION_CLOSED, WS_PRIVATE_CONNECTION_START} from "../../services/actions/ws-action";

const FEED_TEXT = 'В этом разделе вы можете просмотреть свою историю заказов';

export const UserOrders = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { orders } = useSelector(state => state.wsOrders);

  useEffect(() => {
    dispatch({
      type: WS_PRIVATE_CONNECTION_START
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSED
      });
    };
  }, []);

  const onExitClick = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <Link to="/profile" className={`text text_type_main-medium ${!isActivePath("/profile", pathname) && 'text_color_inactive'} ${styles.link}`}>
          Профиль
        </Link>
        <Link to="/profile/orders" className={`text text_type_main-medium ${!isActivePath("/profile/orders", pathname) && 'text_color_inactive'} ${styles.link}`}>
          История заказов
        </Link>
        <button
          type="button"
          className={`text text_type_main-medium text_color_inactive ${styles.link}`}
          onClick={onExitClick}
        >
          Выход
        </button>
        <p className={`text text_type_main-default text_color_inactive mt-20 ml-5 ${styles.text}`}>
          {FEED_TEXT}
        </p>
      </div>
      <ul className={`${styles.list} custom-scroll`}>
        {orders.map((order) => <OrderInfo key={order._id} order={order} />)}
      </ul>
    </div>
  );
};
