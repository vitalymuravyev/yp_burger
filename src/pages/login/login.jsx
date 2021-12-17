import React from 'react';
import {Link} from "react-router-dom";

import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';

export const Login = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-medium">Вход</h2>
      <div className={styles.form}>
        <EmailInput
          name="email"
        />
        <PasswordInput name="password" />
        <Button type="primary" size="medium">
          Войти
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive">
        Вы — новый пользователь? <Link to='/' className={styles.accent}>Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль? <Link to='/' className={styles.accent}>Восстановить пароль</Link>
      </p>
    </div>
  );
};
