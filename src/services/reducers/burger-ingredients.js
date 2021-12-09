import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  CLOSE_ERROR, INCREASE_COUNTER, DECREASE_COUNTER
} from '../actions/burger-ingredients';

const initialValue = {
  items: [],

  itemsRequest: false,
  itemsFailed: false,
};

export const ingredientsReducer = (state = initialValue, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true
      };
    }
    case GET_ITEMS_SUCCESS: {
      const itemsWithCounter = action.items.map(item => {
        return {...item, counter: 0};
      });
      return {
        ...state,
        itemsRequest: false,
        itemsFailed: false,
        items: itemsWithCounter
      };
    }
    case GET_ITEMS_FAILED: {
      return {
        ...state,
        itemsRequest: false,
        itemsFailed: true
      };
    }
    case CLOSE_ERROR: {
      return {
        ...state,
        itemsFailed: false
      };
    }
    case INCREASE_COUNTER: {
      if (action.isBun) {
        return {
          ...state,
          items: state.items.map(item => {
            if (item.type !== 'bun') return item;
            return item._id === action.id ? {...item, counter: 2} : {...item, counter: 0};
          })
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.id ? {...item, counter: item.counter + 1}: item),
      };
    }
    case DECREASE_COUNTER: {
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.id ? {...item, counter: item.counter - 1} : item),
      };
    }
    default: {
      return state;
    }
  }
};
