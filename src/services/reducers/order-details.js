import {
  PUT_ORDER_INFO_REQUEST,
  PUT_ORDER_INFO_SUCCESS,
  PUT_ORDER_INFO_FAILED,
  REMOVE_ORDER_INFO,
  CLOSE_ERROR
} from '../actions/order-details';

const initialState = {
  id: 0,
  name: '',
  orderRequest: false,
  orderFailed: false
};

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_ORDER_INFO_REQUEST: {
      return {
        ...state,
        orderRequest: true
      };
    }
    case PUT_ORDER_INFO_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        id: action.payload.order.number,
        name: action.payload.name
      };
    }
    case PUT_ORDER_INFO_FAILED: {
      return {
        ...state,
        ...initialState,
        orderFailed: true
      };
    }
    case REMOVE_ORDER_INFO: {
      return {
        ...state,
        ...initialState
      };
    }
    case CLOSE_ERROR: {
      return {
        ...state,
        orderFailed: false
      };
    }
    default: {
      return state;
    }
  }
};
