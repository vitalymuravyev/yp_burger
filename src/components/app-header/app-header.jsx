import React from 'react';

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './app-header.module.css';
import { ButtonWithIcon } from '../button-with-icon/button-with-icon';

export const AppHeader = () => {
    return (
        <header className={styles.container}>
            <nav className={styles.menu}>
                <ButtonWithIcon type="constructor" active />
                <ButtonWithIcon type="list" />
            </nav>
            <ButtonWithIcon type="profile" />
            <span className={styles.logo}>
                <Logo />
            </span>
        </header>
    )
}