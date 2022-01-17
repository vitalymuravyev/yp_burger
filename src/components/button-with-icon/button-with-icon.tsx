import React, { FC } from 'react';
import { Link } from "react-router-dom";

import styles from './button-with-icon.module.css';

type TButtonWithIcon = {
  active: boolean;
  icon: JSX.Element;
  path: string;
}

export const ButtonWithIcon: FC<TButtonWithIcon> = ({ active, children, icon, path }) => {
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
