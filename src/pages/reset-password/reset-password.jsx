import React from 'react';
import {Link} from "react-router-dom";

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.css';

export const ResetPassword = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      <div className={styles.form}>
        <Input
          type="password"
          name="password"
          placeholder="Введите новый пароль"
        />
        <Input
          placeholder="Введите код из письма"
          name="confirmationcode"
        />
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link to='/login' className={styles.accent}>Войти</Link>
      </p>
    </div>
  );
};
