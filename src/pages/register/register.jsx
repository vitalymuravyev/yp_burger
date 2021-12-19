import React, {useCallback, useState} from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.css';
import {registerUser} from "../../services/actions/user-registration";

export const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onNameChange = (evt) => {
    setName(evt.target.value);
  };

  const onEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const onPasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const onButtonClick = useCallback(() => {
    const data = {
      name,
      email,
      password
    };
    dispatch(registerUser(data));
  }, [dispatch, email, name, password]);

  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-medium">Регистрация</h2>
      <div className={styles.form}>
        <Input
          placeholder="Имя"
          name="name"
          value={name}
          onChange={onNameChange}
        />
        <EmailInput
          name="email"
          value={email}
          onChange={onEmailChange}
        />
        <PasswordInput
          name="password"
          value={password}
          onChange={onPasswordChange}
        />
        <Button
          type="primary"
          size="medium"
          onClick={onButtonClick}
        >
          Зарегистрироваться
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы? <Link to='/login' className={styles.accent}>Войти</Link>
      </p>
    </div>
  );
};
