import React, {useEffect, useReducer, useState} from 'react';
import styles from './app.module.css';

import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerContext, DataContext} from "../../services/appContext";
import {API_URL, ERROR_MESSAGE} from "../../utils/constants";
import {Modal} from "../modal/modal";

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
  const [data, setData] = useState( []);
  const [errorMessage, setErrorMessage] = useState(false);

  const [ burger, dispatchBurger ] = useReducer(burgerReducer, burgerInitialState, undefined);

  useEffect(() => {
    fetch(`${API_URL}/ingredients`)
      .then(res => {
        if (res.status !== 200) {
          return Promise.reject(new Error(res.statusText));
        }
        return Promise.resolve(res);
      })
      .then(res => res.json())
      .then(result => setData(result.data))
      .catch((err) => setErrorMessage(true));
  }, []);

  const closeModal = () => {
    setErrorMessage(false);
  };

  return (
    <div className="App">
      <DataContext.Provider value={{data, setData}}>
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
      </DataContext.Provider>
    </div>
  );
}

export default App;
