import {IWsOrdersResponse} from "../../utils/types";

export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_PRIVATE_CONNECTION_START = 'WS_PRIVATE_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_FAILED = 'WS_CONNECTION_FAILED';

export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';

export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';

export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';

interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}
interface IWsPrivateConnectionStartAction {
  readonly type: typeof WS_PRIVATE_CONNECTION_START;
}
interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
interface IWsConnectionFailedAction {
  readonly type: typeof WS_CONNECTION_FAILED;
}

interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
}

interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

interface IWsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  payload: IWsOrdersResponse;
}

export type TWsConnectionActions =
  IWsConnectionStartAction
  | IWsPrivateConnectionStartAction
  | IWsConnectionSuccessAction
  | IWsConnectionFailedAction
  | IWsConnectionErrorAction
  | IWsConnectionClosedAction
  | IWsGetMessageAction;



