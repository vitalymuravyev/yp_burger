import React, {useCallback, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";

import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.css';
import {registerUser} from "../../services/actions/user-registration";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  };

  const onEmailChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };

  const onPasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  const onFormSubmit = useCallback((evt) => {
    evt.preventDefault();
    const data = {
      name,
      email,
      password
    };
    dispatch(registerUser(data));
  }, [dispatch, email, name, password]);

  useEffect(() => {
    if (localStorage.getItem('refreshToken')) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-medium">Регистрация</h2>
      <form className={styles.form} onSubmit={(evt) => onFormSubmit(evt)}>
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
        >
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы? <Link to='/login' className={styles.accent}>Войти</Link>
      </p>
    </div>
  );
};
