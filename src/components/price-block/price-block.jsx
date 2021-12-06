import React from "react";
import PropTypes from 'prop-types';

import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './price-block.module.css';

export const PriceBlock = ({ count, size, className }) => {
    return (
        <span className={`text text_type_digits-${size} ${className} ${styles.price} ${size === 'medium' && styles.medium}`}>
            {count}<CurrencyIcon type="primary" />
        </span>
    );
};

PriceBlock.propTypes = {
    count: PropTypes.number.isRequired,
    size: PropTypes.oneOf(['default', 'medium']),
    className: PropTypes.string
};
