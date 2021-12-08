import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './app.module.css';

import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import { ERROR_MESSAGE} from "../../utils/constants";
import {Modal} from "../modal/modal";
import {CLOSE_ERROR, getItems} from "../../services/actions/burger-ingredients";


function App() {
  const dispatch = useDispatch();
  const errorMessage = useSelector(state => state.ingredients.itemsFailed);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const closeModal = () => {
    dispatch({
      type: CLOSE_ERROR
    });
  };

  return (
    <div className="App">
      <AppHeader />
      <main className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
      </main>
      {errorMessage &&
        <Modal closeModal={closeModal}>
          <p className="text text_type_main-large">
            {ERROR_MESSAGE}
          </p>
        </Modal>
      }
    </div>
  );
}

export default App;
