import {Middleware, MiddlewareAPI} from "redux";
import Cookies from "js-cookie";
import {
  TWsConnectionActions, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS, WS_GET_MESSAGE,
  WS_PRIVATE_CONNECTION_START
} from "../actions/ws-action";
import {AppDispatch, RootState} from "../../utils/types";


export const wSocketMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TWsConnectionActions) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(`${wsUrl}/all`);
      } else if (type === WS_PRIVATE_CONNECTION_START) {
          const token = Cookies.get('accessToken');
          socket = new WebSocket(`${wsUrl}?token=${token && token.slice(7)}`);
        }

      if (socket) {
        socket.onopen = evt => {
          dispatch({
            type: WS_CONNECTION_SUCCESS,
            payload: evt
          });
        };

        socket.onerror = evt => {
          dispatch({
            type: WS_CONNECTION_ERROR,
            payload: evt
          });
        };

        socket.onmessage = evt => {
          const { data } = evt;
          const parsedData = JSON.parse(data);
          dispatch({
            type: WS_GET_MESSAGE,
            payload: parsedData
          });
        };

        socket.onclose = evt => {
          dispatch({
            type: WS_CONNECTION_CLOSED,
            payload: evt
          });
        };

        if (type === WS_CONNECTION_CLOSED) {
          socket.close();
        }
      }

      next(action);
    };
  });
};
