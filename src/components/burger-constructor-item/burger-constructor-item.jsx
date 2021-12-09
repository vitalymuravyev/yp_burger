import React, {useRef} from "react";
import PropTypes from 'prop-types';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientType} from "../../utils/types";

export const BurgerConstructorItem = ({item, onRemoveClick, className}) => {
  // const ref = useRef(null);
  return (
    <li className={className}>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => onRemoveClick(item)}
      />
    </li>
  );
};

BurgerConstructorItem.propTypes = {
  item: ingredientType.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  className: PropTypes.string
};