import React, {useCallback, useMemo, useState} from "react";
import { useDrop} from "react-dnd";
import {useLocation, useNavigate} from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import {getPrice, useDispatch, useSelector} from '../../utils/helpers';

import styles from './burger-constructor.module.css';
import {PriceBlock} from "../price-block/price-block";
import {OrderDetails} from "../order-details/order-details";
import {Modal} from "../modal/modal";

import {ERROR_MESSAGE_ORDER, EMPTY_ORDER} from "../../utils/constants";
import {ADD_BURGER_ITEM, DRAG_ITEM, REMOVE_BURGER_ITEM, RESET_BURGER} from "../../services/actions/burger-constructor";
import {CLOSE_ERROR, postOrder, REMOVE_ORDER_INFO} from "../../services/actions/order-details";
import {BurgerConstructorItem} from "../burger-constructor-item/burger-constructor-item";

import {TIngredient} from "../../utils/types";

const override = css`
  position: absolute;
  top: 10px;
  left: -20px;
`;

export const BurgerConstructor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isUserAuth } = useSelector(state => state.userAuth);

  const [modalVisible, setModalVisible] = useState(false);

  const errorMessage = useSelector(state => state.orderDetails.orderFailed);

  const dispatch = useDispatch();
  const {burger} = useSelector(state => state);
  const { orderRequest } = useSelector(state => state.orderDetails);
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
    if (!isUserAuth) {
      navigate('/login', {state: { from: location }});
    } else {
      dispatch(postOrder(ingredients, bun, setModalVisible));
    }
  }, [bun, dispatch, ingredients, isUserAuth, location, navigate]);

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

  const onRemoveClick = (item: TIngredient): void => {
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
        <ClipLoader loading={orderRequest} size={60} color='#8585AD' css={override} />
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
              {ingredients.map((item: TIngredient, index: number) => {
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
