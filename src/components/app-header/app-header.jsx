import React from 'react';
import { useLocation } from 'react-router-dom';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';
import { ButtonWithIcon } from '../button-with-icon/button-with-icon';

const LABELS = {
  constructor: 'Конструктор',
  list: 'Лента заказов',
  profile: 'Личный кабинет',
};

export const AppHeader = () => {
  const { pathname } = useLocation();

  const isActive = (path) => {
    return path === pathname;
  };

  return (
    <header className={styles.container}>
      <div className={styles.wrapper}>
        <nav className={styles.menu}>
          <ButtonWithIcon
            active={isActive("/")}
            icon={<BurgerIcon type={isActive("/") ? "primary" : "secondary"} />}
            path="/"
          >
            {LABELS.constructor}
          </ButtonWithIcon>
          <ButtonWithIcon
            active={isActive("/order-feed")}
            icon={<ListIcon type={isActive("/order-feed") ? "primary" : "secondary"} />}
            path="/order-feed"
          >
            {LABELS.list}
          </ButtonWithIcon>
        </nav>
        <ButtonWithIcon
          active={isActive("/login")}
          icon={<ProfileIcon type={isActive("/login") ? "primary" : "secondary"} /> }
          path="/login"
        >
          {LABELS.profile}
        </ButtonWithIcon>
        <span className={styles.logo}>
          <Logo />
      </span>
      </div>
    </header>
  );
};
