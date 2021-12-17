import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import styles from './button-with-icon.module.css';

export const ButtonWithIcon = ({ active, children, icon, path }) => {
    const textColor = active ? '' : 'text_color_inactive';
    return(
        <Link to={path} className={styles.wrapper}>
            {icon}
            <p className={`text text_type_main-default ${textColor} ml-2`}>
                {children}
            </p>
        </Link>
    );
};

ButtonWithIcon.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    path: PropTypes.string.isRequired
};
