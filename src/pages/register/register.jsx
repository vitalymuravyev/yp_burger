import React from 'react';
import {Link} from "react-router-dom";

import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.css';

export const Register = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-medium">Регистрация</h2>
      <div className={styles.form}>
        <Input
          placeholder="Имя"
          name="name"
        />
        <EmailInput
          name="email"
        />
        <PasswordInput name="password" />
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы? <Link to='/login' className={styles.accent}>Войти</Link>
      </p>
    </div>
  );
};
