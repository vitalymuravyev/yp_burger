import React, {useCallback} from 'react';
import {Link, useLocation} from "react-router-dom";
import styles from './user-orders.module.css';
import {isActivePath, useDispatch} from "../../utils/helpers";
import {logoutUser} from "../../services/actions/user-auth";
import {OrderDetailsInfo} from "../../components/order-details-info/order-details-info";

export const UserOrders = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

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
      </div>
      <OrderDetailsInfo />
    </div>
  );
};
