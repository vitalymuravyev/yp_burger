import React, { useRef, FC } from "react";
import { useDrag, useDrop } from "react-dnd";

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {TIngredient} from "../../utils/types";

type TBurgerConstructorItem = {
  item: TIngredient;
  className: string;
  id: string;
  index: number;
  onRemoveClick: (item: TIngredient) => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void
}

type DragObject = {
  index: number;
}

export const BurgerConstructorItem: FC<TBurgerConstructorItem> = ({item, onRemoveClick, className, index, moveItem, id}) => {
  const ref = useRef<HTMLLIElement>(null);

  const [, drop] = useDrop({
    accept: 'burger',
    hover: (unit: DragObject, monitor) => {
      if (!ref.current) return;

      const dragIndex = unit.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset() || {x: 0, y: 0};
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
    <li className={className} ref={ref} style={{opacity}} data-test-id="constructor-drag-element" >
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
