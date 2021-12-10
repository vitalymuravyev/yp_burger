import React, {useEffect} from "react";
import { useInView } from "react-intersection-observer";
import PropTypes from 'prop-types';

import {useDispatch, useSelector} from "react-redux";
import styles from './ingredients-list.module.css';

import { ingredientTypes } from '../../utils/data';
import {IngredientCard} from "../ingredient-card/ingredient-card";
import {IngredientDetails} from "../ingredient-details/ingredient-details";
import {ADD_ITEM_INFO, REMOVE_ITEM_INFO} from "../../services/actions/ingredient-card";
import {ADD_BURGER_ITEM} from "../../services/actions/burger-constructor";

export const IngredientsList = ({ type, reference, changeTab }) => {
  const data = useSelector(state => state.ingredients.items);
  const dispatch = useDispatch();
  const { isDetailsVisible } = useSelector(state => state.ingredientInfo);
  const ingredients = data.filter((item) => item.type === type);

  const { ref, inView, entry } = useInView({
    threshold: [0, 0.25, 0.5, 0.75, 1]
  });

  useEffect(() => {
    const ratio = entry ? entry.intersectionRatio : 0;
    changeTab(type, ratio);
  }, [entry]);

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
      <div ref={reference}>
        <div className={styles.wrapper} ref={ref} >
          <h3 className="text text_type_main-medium" >{ingredientTypes[type]}</h3>
          <div className={styles.list}>
            {ingredients.map((item) =>
              <IngredientCard
                key={item._id}
                item={item}
                onClick={() => handleItemClick(item)}
              />
            )}
          </div>
        </div>
      </div>
      {isDetailsVisible && <IngredientDetails closeModal={closeModal} />}
    </React.Fragment>
  );
};

IngredientsList.propTypes = {
  type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  reference: PropTypes.object.isRequired,
  changeTab: PropTypes.func.isRequired
};
