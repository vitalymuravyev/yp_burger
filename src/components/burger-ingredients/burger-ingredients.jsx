import React, {useEffect, useState} from "react";

import styles from './burger-ingredients.module.css';

import {TabPanel} from "../tab-panel/tab-panel";
import {IngredientsList} from "../ingredients-list/ingredients-list";
import {Modal} from "../modal/modal";
import {DataContext} from "../../utils/appContext";

const URL = 'https://norma.nomoreparties.space/api/ingredients';
const ERROR_MESSAGE = 'Что-то пошло не так! Перезагрузите страницу';

export const BurgerIngredients = () => {
  const [data, setData] = useState( []);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    fetch(URL)
      .then(res => {
        if (res.status !== 200) {
          return Promise.reject(new Error(res.statusText))
        }
        return Promise.resolve(res);
      })
      .then(res => res.json())
      .then(result => setData(result.data))
      .catch((err) => setErrorMessage(true));
  }, []);

  const closeModal = () => {
    setErrorMessage(false);
  }

  return (
    <DataContext.Provider value={{data, setData}}>
      <section className={styles.wrapper}>
        <h2 className="text text_type_main-large">Соберите бургер</h2>
        <TabPanel />
        <div className={`${styles.list} custom-scroll`}>
          <IngredientsList type="bun"/>
          <IngredientsList type="sauce"/>
          <IngredientsList type="main" />
        </div>
      </section>
      {errorMessage &&
        <Modal closeModal={closeModal}>
          <p className="text text_type_main-large">
            {ERROR_MESSAGE}
          </p>
        </Modal>
      }
    </DataContext.Provider>
  )
}

BurgerIngredients.propTypes = {
}
