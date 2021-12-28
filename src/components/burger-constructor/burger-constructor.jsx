import React, {useCallback, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useDrop} from "react-dnd";

import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';
import {PriceBlock} from "../price-block/price-block";
import {OrderDetails} from "../order-details/order-details";
import {Modal} from "../modal/modal";

import {ERROR_MESSAGE_ORDER, EMPTY_ORDER} from "../../utils/constants";
import {ADD_BURGER_ITEM, DRAG_ITEM, REMOVE_BURGER_ITEM, RESET_BURGER} from "../../services/actions/burger-constructor";
import {CLOSE_ERROR, postOrder, REMOVE_ORDER_INFO} from "../../services/actions/order-details";
import {BurgerConstructorItem} from "../burger-constructor-item/burger-constructor-item";

const getPrice = (newBurger) => {
  const price = newBurger.bun ? newBurger.bun.price * 2 : 0;
  return newBurger.ingredients.reduce((sum, item) => sum + item.price, price);
};

export const BurgerConstructor = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const errorMessage = useSelector(state => state.orderDetails.orderFailed);

  const dispatch = useDispatch();
  const {burger} = useSelector(state => state);
  const bun = burger.bun;
  const ingredients = burger.ingredients;


  const [, dropTarget] = useDrop({
    accept: ['ingredient', 'burger'],
    drop(item, monitor) {
      const itemType = monitor.getItemType();
      if (itemType === 'ingredient') {
        dispatch({
          type: ADD_BURGER_ITEM,
          payload: item
        });
      }
    },
  });

  const moveItem = useCallback((dragIndex, hoverIndex) => {
    const dragItem = ingredients[dragIndex];
    dispatch({
      type: DRAG_ITEM,
      dragIndex,
      hoverIndex,
      dragItem
    });
  }, [dispatch, ingredients]);

  const totalPrice = useMemo(() => getPrice(burger), [burger]);

  const onOrderClick = useCallback(() => {
    dispatch(postOrder(ingredients, bun, setModalVisible));
  }, [bun, dispatch, ingredients]);

  const closeModal = () => {
    setModalVisible(false);
    dispatch({
      type: REMOVE_ORDER_INFO
    });
    dispatch({
      type: RESET_BURGER
    });
  };

  const closeError = () => {
    dispatch({
      type: CLOSE_ERROR
    });
  };

  const onRemoveClick = (item) => {
    dispatch({
      type: REMOVE_BURGER_ITEM,
      item
    });
  };

  if (!bun && ingredients.length === 0) {
    return (
      <section className={styles.wrapper} ref={dropTarget}>
        <p className={`text text_type_main-medium ${styles.text}`}>
          {EMPTY_ORDER}
        </p>
      </section>
    );
  }

  return (
    <React.Fragment>
      <section className={styles.wrapper} ref={dropTarget} >
        <div className={styles.container}>
          {bun && <div className={styles.item}>
            <ConstructorElement
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
              type="top"
              isLocked
            />
          </div>}
            <ul className={`${styles.list} custom-scroll`}>
              {ingredients.map((item, index, arr) => {
                  return (
                    <BurgerConstructorItem
                      key={item._id + index}
                      className={styles.item}
                      item={item}
                      onRemoveClick={onRemoveClick}
                      index={index}
                      moveItem={moveItem}
                      id={item._id}
                    />
                  );
                }
              )}
            </ul>
          {bun && <div className={styles.item}>
            <ConstructorElement
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
              type="bottom"
              isLocked
            />
          </div>}
        </div>
        <div className={`${styles.order} ${bun ? '' : styles.disabled}`}>
          <PriceBlock count={totalPrice} size="medium" />
          <Button size="large" onClick={onOrderClick}>Оформить заказ</Button>
        </div>
      </section>
      {modalVisible && <OrderDetails closeModal={closeModal} />}
      {errorMessage &&
        <Modal closeModal={closeError}>
          <p className="text text_type_main-large">
            {ERROR_MESSAGE_ORDER}
          </p>
        </Modal>
      }
    </React.Fragment>
  );
};
