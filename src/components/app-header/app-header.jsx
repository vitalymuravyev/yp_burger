import React from 'react';
import {Link, useLocation} from 'react-router-dom';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';
import { ButtonWithIcon } from '../button-with-icon/button-with-icon';
import { isActivePath } from "../../utils/helpers";

const LABELS = {
  constructor: 'Конструктор',
  list: 'Лента заказов',
  profile: 'Личный кабинет',
};

export const AppHeader = () => {
  const { pathname } = useLocation();

  return (
    <header className={styles.container}>
      <div className={styles.wrapper}>
        <nav className={styles.menu}>
          <ButtonWithIcon
            active={isActivePath("/", pathname)}
            icon={<BurgerIcon type={isActivePath("/", pathname) ? "primary" : "secondary"} />}
            path="/"
          >
            {LABELS.constructor}
          </ButtonWithIcon>
          <ButtonWithIcon
            active={isActivePath("/order-feed", pathname)}
            icon={<ListIcon type={isActivePath("/order-feed", pathname) ? "primary" : "secondary"} />}
            path="/order-feed"
          >
            {LABELS.list}
          </ButtonWithIcon>
        </nav>
        <ButtonWithIcon
          active={isActivePath("/profile", pathname)}
          icon={<ProfileIcon type={isActivePath("/profile", pathname) ? "primary" : "secondary"} /> }
          path="/profile"
        >
          {LABELS.profile}
        </ButtonWithIcon>
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>
      </div>
    </header>
  );
};
