import React from 'react';
import { Link } from "react-router-dom";

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password.module.css';

export const ForgotPassword = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      <div className={styles.form}>
        <Input
          placeholder="Укажите e-mail"
          name="email"
          type="email"
        />
        <Button type="primary" size="medium">
          Восстановить
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link to='/login' className={styles.accent}>Войти</Link>
      </p>
    </div>
  );
};
