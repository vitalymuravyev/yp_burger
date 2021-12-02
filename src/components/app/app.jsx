import React, {useReducer} from 'react';
import styles from './app.module.css';

import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerContext} from "../../utils/appContext";

const burgerInitialState = {bun: null, ingredients: [], price: 0};

function burgerReducer(state, action) {
  switch (action.type) {
    case 'add':
      if (action.payload.type === 'bun') {
        return ({
          ...state,
          bun: action.payload,
          price: state.price + action.payload.price * 2
        })
      }
      return ({
        ...state,
        ingredients: [...state.ingredients, action.payload],
        price: state.price + action.payload.price
      })
    default:
      console.log('wrong action type')
  }
}

function App() {
  const [ burger, burgerDispatcher ] = useReducer(burgerReducer, burgerInitialState, undefined)
  return (
    <div className="App">
      <AppHeader />
      <main className={styles.main}>
        <BurgerContext.Provider value={{burger, burgerDispatcher}}>
          <BurgerIngredients />
          <BurgerConstructor />
        </BurgerContext.Provider>
      </main>
    </div>
  );
}

export default App;
