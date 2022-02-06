import {Middleware, MiddlewareAPI} from "redux";
import Cookies from "js-cookie";
import {
  TWsConnectionActions, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS, WS_GET_MESSAGE,
  WS_PRIVATE_CONNECTION_START
} from "../actions/ws-action";
import {AppDispatch, IWsMiddlewareActions, RootState} from "../../utils/types";


export const wSocketMiddleware = (wsUrl: string, wsActions: IWsMiddlewareActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TWsConnectionActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsStart, wsPrivateStart, wsOpen, wsError, wsMessage, wsClose} = wsActions;

      if (type === wsStart) {
        socket = new WebSocket(`${wsUrl}/all`);
      } else if (type === wsPrivateStart) {
          const token = Cookies.get('accessToken');
          socket = new WebSocket(`${wsUrl}?token=${token?.slice(7)}`);
        }

      if (socket) {
        socket.onopen = evt => {
          dispatch({
            type: wsOpen,
            payload: evt
          });
        };

        socket.onerror = evt => {
          dispatch({
            type: wsError,
            payload: evt
          });
        };

        socket.onmessage = evt => {
          const { data } = evt;
          const parsedData = JSON.parse(data);
          dispatch({
            type: wsMessage,
            payload: parsedData
          });
        };

        socket.onclose = evt => {
          dispatch({
            type: wsClose,
            payload: evt
          });
        };

        if (type === wsClose) {
          socket.close();
        }

      }

      next(action);
    };
  });
};
