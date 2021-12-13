import React, {useRef} from "react";
import PropTypes from 'prop-types';
import {useDrag, useDrop} from "react-dnd";

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientType} from "../../utils/types";

export const BurgerConstructorItem = ({item, onRemoveClick, className, index, moveItem, id}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'burger',
    hover: (unit, monitor) => {
      if (!ref.current) return;

      const dragIndex = unit.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveItem(dragIndex, hoverIndex);


      // eslint-disable-next-line no-param-reassign
      unit.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'burger',
    item: () => {
      return { id, index};
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(drop(ref));
  const opacity = isDragging ? 0 : 1;

  return (
    <li className={className} ref={ref} style={{opacity}}>
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
  className: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  moveItem: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};