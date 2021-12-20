import React, {useCallback, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import { useDispatch } from "react-redux";

import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';
import { isActivePath } from "../../utils/helpers";

export const Profile = () => {
  const { pathname } = useLocation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <Link to="/profile" className={`text text_type_main-medium ${!isActivePath("/profile", pathname) && 'text_color_inactive'} ${styles.link}`}>
          Профиль
        </Link>
        <Link to="/profile/orders" className={`text text_type_main-medium ${!isActivePath("/profile/orders", pathname) && 'text_color_inactive'} ${styles.link}`}>
          История заказов
        </Link>
        <button type="button" className={`text text_type_main-medium text_color_inactive ${styles.link}`}>
          Выход
        </button>
      </div>
      <div className={styles.form} >
        <Input
          placeholder="Имя"
          name="name"

        />
        <EmailInput
          name="email"

        />
        <PasswordInput
          name="password"

        />
        <div>
          <Button
            type="secondary"
            size="medium"
          >
            Отмена
          </Button><Button
          type="primary"
          size="medium"
        >
          Сохранить
        </Button>
        </div>
      </div>
    </div>
  );
};
