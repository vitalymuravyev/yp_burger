import {
  TWsConnectionActions,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE
} from '../actions/ws-action';

type TWsState = {
  orders: [];
  total: number;
  totalToday: number;

  wsConnection: boolean;
  wsConnectionError: boolean;
}

const initialState: TWsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  wsConnection: false,
  wsConnectionError: false,
};

export const wsOrderReducer = (state = initialState, action: TWsConnectionActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnection: true
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        ...initialState,
        wsConnectionError: true
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        ...initialState
      };
    }
    case WS_GET_MESSAGE: {
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };
    }
    default: {
      return state;
    }
  }
};
