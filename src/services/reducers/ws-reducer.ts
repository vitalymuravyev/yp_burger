import {
  TWsConnectionActions,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_CONNECTION_START
} from '../actions/ws-action';
import {IOrderInfo} from "../../utils/types";

interface IWsState {
  orders: Array<IOrderInfo>;
  total: number;
  totalToday: number;

  wsConnection: boolean;
  wsConnectionError: boolean;
  wsConnectionLoading: boolean;
}

const initialState: IWsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  wsConnection: false,
  wsConnectionError: false,
  wsConnectionLoading: false
};

export const wsOrderReducer = (state = initialState, action: TWsConnectionActions) => {
  switch (action.type) {
    case WS_CONNECTION_START: {
      return {
        ...state,
        wsConnectionLoading: true
      };
    }
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnection: true,
        wsConnectionLoading: false
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
