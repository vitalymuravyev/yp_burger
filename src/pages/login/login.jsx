import React, {useCallback, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import {loginUser} from "../../services/actions/user-auth";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userAuth } = useSelector(state => state);

  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginClick = useCallback(() => {
    dispatch(loginUser({email, password}));
  }, [dispatch, email, password]);

  useEffect(() => {
    if (userAuth.isUserAuth) {
      navigate(from, { replace: true });
    }
  }, [from, navigate, userAuth.isUserAuth]);

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
