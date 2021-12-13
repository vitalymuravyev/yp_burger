import React from 'react';
import PropTypes from 'prop-types';

import styles from './button-with-icon.module.css';

export const ButtonWithIcon = ({ active, children, icon }) => {
    const textColor = active ? '' : 'text_color_inactive';
    return(
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a href="#" className={styles.wrapper}>
            {icon}
            <p className={`text text_type_main-default ${textColor} ml-2`}>
                {children}
            </p>
        </a>
    );
};

ButtonWithIcon.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired
};
