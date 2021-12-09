import {API_URL} from "../../utils/constants";

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export const CLOSE_ERROR = 'CLOSE_ERROR';

export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const DECREASE_COUNTER = 'DECREASE_COUNTER';

export const getItems = () => {
  return function (dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    fetch(`${API_URL}/ingredients`)
      .then(res => {
        if (res.status !== 200) {
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
