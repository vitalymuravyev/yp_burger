import React, {useCallback, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch } from '../../utils/helpers';

import styles from './login.module.css';
import {loginUser } from "../../services/actions/user-auth";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem('refreshToken')) {
      navigate(from, { replace: true });
    }
  }, [from, navigate]);

  const onFormSubmit = useCallback((evt) => {
    evt.preventDefault();
    dispatch(loginUser({email, password}));
    navigate(from, { replace: true });
  }, [dispatch, email, password, navigate, from]);

  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-medium">Вход</h2>
      <form className={styles.form} onSubmit={(evt) => onFormSubmit(evt)}>
        <Input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
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
        >
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Вы — новый пользователь? <Link to='/register' className={styles.accent}>Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль? <Link to='/forgot-password' className={styles.accent}>Восстановить пароль</Link>
      </p>
    </div>
  );
};
