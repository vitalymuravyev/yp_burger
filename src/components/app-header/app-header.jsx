import React from 'react';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';
import { ButtonWithIcon } from '../button-with-icon/button-with-icon';

const LABELS = {
  constructor: 'Конструктор',
  list: 'Лента заказов',
  profile: 'Личный кабинет',
}

export const AppHeader = () => {
    return (
        <header className={styles.container}>
            <nav className={styles.menu}>
              <ButtonWithIcon active icon={<BurgerIcon type="primary" />}>
                {LABELS.constructor}
              </ButtonWithIcon>
              <ButtonWithIcon icon={<ListIcon type="secondary" />}>
                {LABELS.list}
              </ButtonWithIcon>
            </nav>
          <ButtonWithIcon icon={<ProfileIcon type="secondary"/>}>
            {LABELS.profile}
          </ButtonWithIcon>
            <span className={styles.logo}>
                <Logo />
            </span>
        </header>
    )
}
