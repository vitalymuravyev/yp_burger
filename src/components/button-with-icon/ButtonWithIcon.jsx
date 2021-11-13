import React from 'react';
import PropTypes from 'prop-types';

import styles from './ButtonWithIcon.module.css';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const ICONS = {
    constructor: <BurgerIcon type="primary" />,
    list: <ListIcon type="secondary" />,
    profile: <ProfileIcon type="secondary" />,
}

const LABELS = {
    constructor: 'Конструктор',
    list: 'Лента заказов',
    profile: 'Личный кабинет',
}

export class ButtonWithIcon extends React.Component {
    render() {
        const { type, active } = this.props;
        const textColor = active ? '' : 'text_color_inactive'
        return(
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a href="#" className={styles.wrapper}>
                {ICONS[type]}
                <p className={`text text_type_main-default ${textColor} ml-2`}>
                    {LABELS[type]}
                </p>
            </a>
        )
    }
}

ButtonWithIcon.propTypes = {
    type: PropTypes.oneOf(['constructor', 'list', 'profile']).isRequired,
    active: PropTypes.bool
}
