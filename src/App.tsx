import React from 'react';
import styles from './App.module.css';

import { AppHeader } from './components/app-header/AppHeader';
import { BurgerConstructor } from "./components/burger-constructor/burger-constructor";
import {BurgerIngredients} from "./components/burger-ingredients/burger-ingredients";

import { data } from './utils/data';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

export default App;
