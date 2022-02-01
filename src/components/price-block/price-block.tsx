import React, {FC, HTMLAttributes} from "react";

import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './price-block.module.css';

type TPriceBlock = {
    count: number | string;
    size: 'default' | 'medium';
} & HTMLAttributes<HTMLSpanElement>

export const PriceBlock: FC<TPriceBlock> = ({ count, size, className }) => {
    return (
        <span className={`text text_type_digits-${size} ${className} ${styles.price} ${size === 'medium' && styles.medium}`}>
            {count}<CurrencyIcon type="primary" />
        </span>
    );
};
