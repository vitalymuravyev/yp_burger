import { API_URL } from "../../utils/constants";
import {checkResponseStatus} from "../../utils/helpers";

export const USER_REGISTRATION_REQUEST = 'USER_REGISTRATION_REQUEST';
export const USER_REGISTRATION_SUCCESS = 'USER_REGISTRATION_SUCCESS';
export const USER_REGISTRATION_FAILED = 'USER_REGISTRATION_FAILED';

export const SEND_EMAIL_REQUEST = 'SEND_EMAIL_REQUEST';
export const SEND_EMAIL_SUCCESS = 'SEND_EMAIL_SUCCESS';
export const SEND_EMAIL_FAILED = 'SEND_EMAIL_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

const REGISTRATION_ERROR = 'Зарегистрировать пользователя не удалось.';
const EMAIL_ERROR = 'Не удалось отправить ваш email';
const RESET_PASSWORD_ERROR = 'Не удалось обновить ваш пароль';

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
        });

      })
      .catch(() => {
        dispatch({
          type: USER_REGISTRATION_FAILED
        });
      });
  };
};

export const sendEmail = (data) => {
  return function (dispatch) {
    dispatch({
      type: SEND_EMAIL_REQUEST
    });
    fetch(`${API_URL}/password-reset`, {
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
      console.log(result.success);
      if (!result.success) {
        return Promise.reject(new Error(EMAIL_ERROR));
      }
      dispatch({
        type: SEND_EMAIL_SUCCESS
      });
    })
    .catch(() => {
      dispatch({
        type: SEND_EMAIL_FAILED
      });
    });
  };
};

export const resetPassword = (data) => {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
    fetch(`${API_URL}/password-reset/reset`, {
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
        if (!result.success) {
          return Promise.reject(new Error(RESET_PASSWORD_ERROR));
        }
        dispatch({
          type: RESET_PASSWORD_SUCCESS
        });
      })
      .catch(() => {
        dispatch({
          type: RESET_PASSWORD_FAILED
        });
      });
  };
};
