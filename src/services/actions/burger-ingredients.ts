import {API_URL} from "../../utils/constants";
import {AppDispatch, AppThunk, TIngredient} from "../../utils/types";

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export const CLOSE_ERROR = 'CLOSE_ERROR';

interface IGetItemsAction {
  readonly type: typeof GET_ITEMS_REQUEST;
}

interface IGetItemsSuccessAction {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly items: Array<TIngredient>
}

interface IGetItemsFailedAction {
  readonly type: typeof GET_ITEMS_FAILED;
}

interface ICloseErrorAction {
  readonly type: typeof CLOSE_ERROR;
}

export type TGetItemsActions =
  IGetItemsAction
  | IGetItemsFailedAction
  | IGetItemsSuccessAction
  | ICloseErrorAction;

export const getItems: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    fetch(`${API_URL}/ingredients`)
      .then(res => {
        if (!res.ok) {
          return Promise.reject(new Error(res.statusText));
        }
        return Promise.resolve(res);
      })
      .then(res => res.json())
      .then(result => {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: result.data
        });
      })
      .catch(() => {
        dispatch({
          type: GET_ITEMS_FAILED
        });
      });
  };
};
