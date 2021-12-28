import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import styles from './home.module.css';

import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor";
import {BurgerIngredients} from "../../components/burger-ingredients/burger-ingredients";
import { ERROR_MESSAGE} from "../../utils/constants";
import {Modal} from "../../components/modal/modal";
import {CLOSE_ERROR } from "../../services/actions/burger-ingredients";

export const Home = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(state => state.ingredients.itemsFailed);

  const closeModal = () => {
    dispatch({
      type: CLOSE_ERROR
    });
  };

  return (
    <React.Fragment>
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
      {errorMessage &&
        <Modal closeModal={closeModal}>
          <p className="text text_type_main-large">
            {ERROR_MESSAGE}
          </p>
        </Modal>
      }
    </React.Fragment>
  );
};
