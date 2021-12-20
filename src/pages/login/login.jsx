import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import {loginUser} from "../../services/actions/user-login";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginClick = () => {
    dispatch(loginUser({email, password}));
    navigate('/');
  };
  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-medium">Вход</h2>
      <div className={styles.form}>
        <EmailInput
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <PasswordInput
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          type="primary"
          size="medium"
          onClick={onLoginClick}
        >
          Войти
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive">
        Вы — новый пользователь? <Link to='/register' className={styles.accent}>Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль? <Link to='/forgot-password' className={styles.accent}>Восстановить пароль</Link>
      </p>
    </div>
  );
};
