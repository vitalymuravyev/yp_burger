import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./reducers";
import {wSocketMiddleware} from "./middleware/ws-middeleware";
import {WS_API_URL} from "../utils/constants";
import {IWsMiddlewareActions} from "../utils/types";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_PRIVATE_CONNECTION_START
} from "./actions/ws-action";

const wsActions: IWsMiddlewareActions = {
  wsStart: WS_CONNECTION_START,
  wsPrivateStart: WS_PRIVATE_CONNECTION_START,
  wsOpen: WS_CONNECTION_SUCCESS,
  wsError: WS_CONNECTION_ERROR,
  wsClose: WS_CONNECTION_CLOSED,
  wsMessage: WS_GET_MESSAGE
};

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, wSocketMiddleware(WS_API_URL, wsActions)));

export const store = createStore(rootReducer, enhancer);
