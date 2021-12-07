import React, {useEffect, useReducer, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './app.module.css';

import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerContext} from "../../services/appContext";
import { ERROR_MESSAGE} from "../../utils/constants";
import {Modal} from "../modal/modal";
import {CLOSE_ERROR, getItems} from "../../services/actions/burger-ingredients";

const burgerInitialState = {bun: null, ingredients: []};

function burgerReducer(state, action) {
  switch (action.type) {
    case 'add':
      if (action.payload.type === 'bun') {
        return ({
          ...state,
          bun: action.payload,
        });
      }
      return ({
        ...state,
        ingredients: [...state.ingredients, action.payload],
      });
    default:
      console.log('wrong action type');
  }
}

function App() {
  const dispatch = useDispatch();
  const errorMessage = useSelector(state => state.ingredients.itemsFailed);

  const [ burger, dispatchBurger ] = useReducer(burgerReducer, burgerInitialState, undefined);

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
        <BurgerContext.Provider value={{burger, dispatchBurger}}>
          <BurgerIngredients />
          <BurgerConstructor />
        </BurgerContext.Provider>
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
