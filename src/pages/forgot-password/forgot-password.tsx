import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../utils/helpers';

import styles from './forgot-password.module.css';
import {sendEmail} from "../../services/actions/user-registration";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isEmailSent } = useSelector(state => state.userRegistration);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (localStorage.getItem('refreshToken')) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const onEmailChange = useCallback((evt) => {
    setEmail(evt.target.value);
  }, []);

  const onFormSubmit = useCallback((evt) => {
    evt.preventDefault();
    dispatch(sendEmail({email}));
  }, [dispatch, email]);

  if (isEmailSent) {
    navigate('/reset-password', {state: {from: location}});
  }

  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      <form className={styles.form} onSubmit={(evt) => onFormSubmit(evt)}>
        <Input
          placeholder="Укажите e-mail"
          name="email"
          type="email"
          value={email}
          onChange={onEmailChange}
        />
        <Button type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link to='/login' className={styles.accent}>Войти</Link>
      </p>
    </div>
  );
};
