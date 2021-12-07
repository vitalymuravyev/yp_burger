import React, {useContext, useState} from "react";
import PropTypes from 'prop-types';

import {useSelector} from "react-redux";
import styles from './ingredients-list.module.css';

import { ingredientTypes } from '../../utils/data';
import {IngredientCard} from "../ingredient-card/ingredient-card";
import {IngredientDetails} from "../ingredient-details/ingredient-details";
import {BurgerContext} from "../../services/appContext";

export const IngredientsList = ({ type }) => {
  const data = useSelector(state => state.ingredients.items);
  const { dispatchBurger } = useContext(BurgerContext);
  const ingredients = data.filter((item) => item.type === type);

  const [detailsVisible, setDetailsVisible] = useState(false);
  const [details, setDetails] = useState({});

  const closeModal = () => {
    setDetailsVisible(false);
  };

  const handleItemClick = (item) => {
    setDetailsVisible(true);
    setDetails(item);
    dispatchBurger({type: 'add', payload: item});
  };

  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        <h3 className="text text_type_main-medium">{ingredientTypes[type]}</h3>
        <div className={styles.list}>
          {ingredients.map((item) =>
            <IngredientCard
              key={item._id}
              image={item.image}
              price={item.price}
              name={item.name}
              onClick={() => handleItemClick(item)}
            />
          )}
        </div>
      </div>
      {detailsVisible && <IngredientDetails closeModal={closeModal} data={details} />}
    </React.Fragment>
  );
};

IngredientsList.propTypes = {
  type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired
};
