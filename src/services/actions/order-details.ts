import { API_URL} from "../../utils/constants";
import {AppDispatch, TIngredient} from "../../utils/types";

export const PUT_ORDER_INFO_REQUEST = 'PUT_ORDER_INFO_REQUEST';
export const PUT_ORDER_INFO_SUCCESS = 'PUT_ORDER_INFO_SUCCESS';
export const PUT_ORDER_INFO_FAILED = 'PUT_ORDER_INFO_FAILED';
export const REMOVE_ORDER_INFO = 'REMOVE_ORDER_INFO';
export const CLOSE_ERROR = 'CLOSE_ERROR';

interface IPutOrderInfoAction {
  readonly type: typeof PUT_ORDER_INFO_REQUEST;
}

interface IPutOrderInfoSuccessAction {
  readonly type: typeof PUT_ORDER_INFO_SUCCESS;
  readonly payload: {name: string, order: {number: number}}
}

interface IPutOrderInfoFailedAction {
  readonly type: typeof PUT_ORDER_INFO_FAILED;
}

interface IRemoveOrderInfoAction {
  readonly type: typeof REMOVE_ORDER_INFO;
}

interface ICloseError {
  readonly type: typeof CLOSE_ERROR;
}

export type TOrderDetailsActions =
  IPutOrderInfoAction
  | IPutOrderInfoSuccessAction
  | IPutOrderInfoFailedAction
  | IRemoveOrderInfoAction
  | ICloseError;

export const postOrder = (ingredients: ReadonlyArray<TIngredient>, bun: TIngredient | '', openModal: (value: boolean) => void ) => {
  const data = {
    ingredients: [...ingredients.map((item) => item._id), bun && bun._id]
  };

  return function (dispatch: AppDispatch) {
    dispatch({
      type: PUT_ORDER_INFO_REQUEST
    });
    fetch(`${API_URL}/orders`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(new Error(res.statusText));
        }
        return Promise.resolve(res);
      })
      .then(res => res.json())
      .then(result => {
        dispatch({
          type: PUT_ORDER_INFO_SUCCESS,
          payload: result
        });
        openModal(true);
      })
      .catch(() => {
        dispatch({
          type: PUT_ORDER_INFO_FAILED
        });
      });
  };
};
