import React from 'react';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';
import { ButtonWithIcon } from '../button-with-icon/button-with-icon';

const LABELS = {
  constructor: 'Конструктор',
  list: 'Лента заказов',
  profile: 'Личный кабинет',
};

export const AppHeader = () => {
    return (
        <header className={styles.container}>
          <div className={styles.wrapper}>
            <nav className={styles.menu}>
              <ButtonWithIcon active icon={<BurgerIcon type="primary" />} path="/">
                {LABELS.constructor}
              </ButtonWithIcon>
              <ButtonWithIcon icon={<ListIcon type="secondary" />} path="/order-feed">
                {LABELS.list}
              </ButtonWithIcon>
            </nav>
            <ButtonWithIcon icon={<ProfileIcon type="secondary" /> } path="/login">
              {LABELS.profile}
            </ButtonWithIcon>
            <span className={styles.logo}>
              <Logo />
          </span>
          </div>
        </header>
    );
};
