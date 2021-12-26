import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {useDispatch, useSelector} from "react-redux";

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.css';
import {resetPassword} from "../../services/actions/user-registration";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isPasswordChanged } = useSelector(state => state.userRegistration);
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    if (Cookies.get('accessToken')) {
      navigate('/', { replace: true });
    }
    if (!location.state) {
      navigate('/forgot-password', { replace: true });
    }
  }, [location.state, navigate]);

  const onPasswordChange = useCallback((evt) => {
    setPassword(evt.target.value);
  }, []);

  const onTokenChange = (evt) => {
    setToken(evt.target.value);
  };

  const onSaveClick = useCallback(() => {
    dispatch(resetPassword({password, token}));
  }, [dispatch, password, token]);

  if (isPasswordChanged) {
    navigate('/login', { replace: true });
  }

  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      <div className={styles.form}>
        <Input
          type="password"
          name="password"
          placeholder="Введите новый пароль"
          value={password}
          onChange={onPasswordChange}
        />
        <Input
          placeholder="Введите код из письма"
          name="token"
          value={token}
          onChange={onTokenChange}
        />
        <Button type="primary" size="medium" onClick={onSaveClick}>
          Сохранить
        </Button>
      </div>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link to='/login' className={styles.accent}>Войти</Link>
      </p>
    </div>
  );
};
