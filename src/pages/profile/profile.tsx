import React, {useCallback, useEffect, useState} from 'react';
import {Link, useLocation } from "react-router-dom";

import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';
import { isActivePath, useDispatch, useSelector } from "../../utils/helpers";
import {getUserProfile, setUserProfile} from "../../services/actions/user-profile";
import {logoutUser} from "../../services/actions/user-auth";
import {WS_CONNECTION_CLOSED, WS_PRIVATE_CONNECTION_START} from "../../services/actions/ws-action";

export const Profile = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { name, email} = useSelector(state => state.userProfile.user);
  const initialState = {
    name,
    email,
    password: '******'
  };

  const [currentName, setCurrentName] = useState(initialState.name);
  const [currentEmail, setCurrentEmail] = useState(initialState.email);
  const [password, setPassword] = useState(initialState.password);

  useEffect(() => {
    dispatch({
      type: WS_PRIVATE_CONNECTION_START
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSED
      });
    };
  });

  const onResetClick = useCallback(() => {
    setCurrentName(initialState.name);
    setCurrentEmail(initialState.email);
    setPassword(initialState.password);
  }, [initialState.email, initialState.name, initialState.password]);

  useEffect(() => {
    dispatch(getUserProfile());
    onResetClick();
  }, [dispatch, onResetClick]);

  const onExitClick = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  const onFormSubmit = useCallback((evt) => {
    evt.preventDefault();
    dispatch(setUserProfile({
      name: currentName,
      email: currentEmail,
      password
    }));
  }, [currentEmail, currentName, dispatch, password]);

  const isFormChanged = useCallback(()=> {
    return !((initialState.name === currentName) && (initialState.email === currentEmail) && (initialState.password === password));
  }, [currentEmail, currentName, initialState.email, initialState.name, initialState.password, password]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <Link to="/profile" className={`text text_type_main-medium ${!isActivePath("/profile", pathname) && 'text_color_inactive'} ${styles.link}`}>
          Профиль
        </Link>
        <Link to="/profile/orders" className={`text text_type_main-medium ${!isActivePath("/profile/orders", pathname) && 'text_color_inactive'} ${styles.link}`}>
          История заказов
        </Link>
        <button
          type="button"
          className={`text text_type_main-medium text_color_inactive ${styles.link}`}
          onClick={onExitClick}
        >
          Выход
        </button>
      </div>
      <form className={styles.form} onSubmit={(evt) => onFormSubmit(evt)}>
        <Input
          placeholder="Имя"
          name="name"
          value={currentName}
          onChange={evt => setCurrentName(evt.target.value)}
        />
        <EmailInput
          name="email"
          value={currentEmail}
          onChange={evt => setCurrentEmail(evt.target.value)}
        />
        <PasswordInput
          name="password"
          value={password}
          onChange={evt => setPassword(evt.target.value)}
        />
        {isFormChanged() ? (< div >
          < Button
          type="secondary"
          size="medium"
          onClick={onResetClick}
          >
          Отмена
          </Button><Button
          type="primary"
          size="medium"
          >
          Сохранить
          </Button>
          </div>) : null}
      </form>
    </div>
  );
};
