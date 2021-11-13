import React from "react";

import styles from './price-block.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export class PriceBlock extends React.Component {
    render() {
        const { count, size, className } = this.props;
        return (
            <span className={`text text_type_digits-${size} ${className} ${styles.price} ${size === 'medium' && styles.medium}`}>
                {count}<CurrencyIcon type="primary" />
            </span>
        )
    }
}
