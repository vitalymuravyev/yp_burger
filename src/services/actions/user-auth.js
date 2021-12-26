import Cookies from 'js-cookie';

import {API_URL, TOKEN_LIFE_TIME} from "../../utils/constants";
import {checkResponseStatus} from "../../utils/helpers";

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';

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
        return checkResponseStatus(res);
      })
      .then(res => res.json())
      .then(result => {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: result
        });
        localStorage.setItem('refreshToken', result.refreshToken);
        Cookies.set('accessToken', result.accessToken, { expires: TOKEN_LIFE_TIME });
      })
      .catch(() => {
        dispatch({
          type: USER_LOGIN_FAILED
        });
      });
  };
};

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
      .then(() => {
        dispatch({
          type: USER_LOGOUT_SUCCESS,
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
