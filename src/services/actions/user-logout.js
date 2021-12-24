import { API_URL } from "../../utils/constants";
import { checkResponseStatus } from "../../utils/helpers";

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';

export const logoutUser = () => {
  return function (dispatch) {
    dispatch({
      type: USER_LOGOUT_REQUEST
    });
    fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    })
      .then(res => checkResponseStatus(res))
      .then(res => res.json())
      .then(result => {
        console.log(result);
        dispatch({
          type: USER_LOGOUT_SUCCESS,
          payload: result
        });
        localStorage.removeItem('refreshToken');
      })
      .catch(() => {
        dispatch({
          type: USER_LOGOUT_FAILED
        });
      });
  };
};
