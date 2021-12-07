import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  CLOSE_ERROR
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
      return {
        ...state,
        itemsRequest: false,
        itemsFailed: false,
        items: action.items
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

    default: {
      return state;
    }
  }
};
