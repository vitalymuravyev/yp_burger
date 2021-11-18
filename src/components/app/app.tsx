import React, {useEffect, useState} from 'react';
import styles from './app.module.css';

import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";

const url = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [state, setState] = useState({ data: []});

  useEffect(() => {
    fetch(url)
      .then(res => {
        if (res.status !== 200) {
          return Promise.reject(new Error(res.statusText))
        }
        return Promise.resolve(res);
      })
      .then(res => res.json())
      .then(result => setState({data: result.data}))
      .catch((err) => console.log(err));
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={state.data} />
        <BurgerConstructor data={state.data} />
      </main>
    </div>
  );
}

export default App;
