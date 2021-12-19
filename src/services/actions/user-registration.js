import { API_URL } from "../../utils/constants";

export const USER_REGISTRATION_REQUEST = 'USER_REGISTRATION_REQUEST';
export const USER_REGISTRATION_SUCCESS = 'USER_REGISTRATION_SUCCESS';
export const USER_REGISTRATION_FAILED = 'USER_REGISTRATION_FAILED';

export const USER_UPDATE_TOKEN_REQUEST = 'USER_UPDATE_TOKEN_REQUEST';
export const USER_UPDATE_TOKEN_SUCCESS = 'USER_UPDATE_TOKEN_SUCCESS';
export const USER_UPDATE_TOKEN_FAILED = 'USER_UPDATE_TOKEN_FAILED';

export const USER_REQUEST_NEW_PASSWORD_REQUEST = 'USER_REQUEST_NEW_PASSWORD_REQUEST';
export const USER_REQUEST_NEW_PASSWORD_SUCCESS = 'USER_REQUEST_NEW_PASSWORD_SUCCESS';
export const USER_REQUEST_NEW_PASSWORD_FAILED = 'USER_REQUEST_NEW_PASSWORD_FAILED';

export const USER_PASSWORD_RESET_REQUEST = 'USER_PASSWORD_RESET_REQUEST';
export const USER_PASSWORD_RESET_SUCCESS = 'USER_PASSWORD_RESET_SUCCESS';
export const USER_PASSWORD_RESET_FAILED = 'USER_PASSWORD_RESET_FAILED';

const REGISTRATION_ERROR = 'Зарегистрировать пользователя не удалось.';

export const registerUser = (data) => {
  return function (dispatch) {
    dispatch({
      type: USER_REGISTRATION_REQUEST
    });
    fetch(`${API_URL}/auth/register`, {
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
        if (!result.success) {
          return Promise.reject(new Error(REGISTRATION_ERROR));
        }
        dispatch({
          type: USER_REGISTRATION_SUCCESS,
          payload: result
        });
      })
      .catch(() => {
        dispatch({
          type: USER_REGISTRATION_FAILED
        });
      });
  };
};
