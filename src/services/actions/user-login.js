import { API_URL } from "../../utils/constants";

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export const loginUser = (data) => {
  return function (dispatch) {
    dispatch({
      type: USER_LOGIN_REQUEST
    });
    fetch(`${API_URL}/auth/login`, {
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
          type: USER_LOGIN_SUCCESS,
          payload: result
        });
      })
      .catch(() => {
        dispatch({
          type: USER_LOGIN_FAILED
        });
      });
  };
};
