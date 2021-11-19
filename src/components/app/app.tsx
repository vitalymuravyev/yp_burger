import React, {useEffect, useState} from 'react';
import styles from './app.module.css';

import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {Modal} from "../modal/modal";

const URL = 'https://norma.nomoreparties.space/api/ingredients';
const ERROR_MESSAGE = 'Что-то пошло не так! Перезагрузите страницу';

function App() {
  const [state, setState] = useState({ data: []});
  const [errorMessage, setErrorMessage] = useState(false);

  const closeModal = () => {
    setErrorMessage(false);
  }

  useEffect(() => {
    fetch(URL)
      .then(res => {
        if (res.status !== 200) {
          return Promise.reject(new Error(res.statusText))
        }
        return Promise.resolve(res);
      })
      .then(res => res.json())
      .then(result => setState({data: result.data}))
      .catch((err) => setErrorMessage(true));
  }, [])

  return (
    <div className="App">
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={state.data} />
        <BurgerConstructor data={state.data} />
      </main>
      {errorMessage &&
        <Modal closeModal={closeModal}>
          <p className="text text_type_main-large">
            {ERROR_MESSAGE}
          </p>
        </Modal>}
    </div>
  );
}

export default App;
