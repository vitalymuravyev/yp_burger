import React from "react";
import PropTypes from 'prop-types';

import {useDispatch, useSelector} from "react-redux";
import styles from './ingredients-list.module.css';

import { ingredientTypes } from '../../utils/data';
import {IngredientCard} from "../ingredient-card/ingredient-card";
import {IngredientDetails} from "../ingredient-details/ingredient-details";
import {ADD_ITEM_INFO, REMOVE_ITEM_INFO} from "../../services/actions/ingredient-card";

export const IngredientsList = ({ type }) => {
  const data = useSelector(state => state.ingredients.items);
  const dispatch = useDispatch();
  const { isDetailsVisible } = useSelector(state => state.ingredientInfo);
  const ingredients = data.filter((item) => item.type === type);

  const closeModal = () => {
    dispatch({
      type: REMOVE_ITEM_INFO
    });
  };

  const handleItemClick = (item) => {
    dispatch({
      type: ADD_ITEM_INFO,
      payload: item
    });
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
      {isDetailsVisible && <IngredientDetails closeModal={closeModal} />}
    </React.Fragment>
  );
};

IngredientsList.propTypes = {
  type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired
};
