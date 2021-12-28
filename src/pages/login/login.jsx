import React, {useCallback, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch } from "react-redux";

import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import {loginUser, USER_IS_LOGED} from "../../services/actions/user-auth";
import {getUserProfile} from "../../services/actions/user-profile";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFormSubmit = useCallback((evt) => {
    evt.preventDefault();
    dispatch(loginUser({email, password}));
    navigate('/', { replace: true });
  }, [dispatch, email, password, navigate]);

  useEffect(() => {
    if (localStorage.getItem('refreshToken')) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-medium">Вход</h2>
      <form className={styles.form} onSubmit={(evt) => onFormSubmit(evt)}>
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
