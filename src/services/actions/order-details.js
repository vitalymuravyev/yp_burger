import { API_URL} from "../../utils/constants";

export const PUT_ORDER_INFO_REQUEST = 'PUT_ORDER_INFO_REQUEST';
export const PUT_ORDER_INFO_SUCCESS = 'PUT_ORDER_INFO_SUCCESS';
export const PUT_ORDER_INFO_FAILED = 'PUT_ORDER_INFO_FAILED';
export const REMOVE_ORDER_INFO = 'REMOVE_ORDER_INFO';
export const CLOSE_ERROR = 'CLOSE_ERROR';

export const postOrder = (ingredients, bun, openModal) => {
  const data = {
    ingredients: [...ingredients.map((item) => item._id), bun._id]
  };

  return function (dispatch) {
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
        if (res.status !== 200) {
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
