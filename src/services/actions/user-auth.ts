import Cookies from 'js-cookie';

import {API_URL, TOKEN_LIFE_TIME} from "../../utils/constants";
import {checkResponseStatus} from "../../utils/helpers";
import {AppDispatch, AppThunk, ILoginResponse, IUserInfo, TUserWithoutName} from "../../utils/types";

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';

export const USER_IS_LOGED = 'USER_IS_LOGED';

interface IUserLoginAction {
  readonly type: typeof USER_LOGIN_REQUEST;
}

interface IUserLoginSuccessAction {
  readonly type: typeof USER_LOGIN_SUCCESS;
  readonly payload: ILoginResponse;
}

interface IUserLoginFailedAction {
  readonly type: typeof USER_LOGIN_FAILED;
}

interface IUserLogoutAction {
  readonly type: typeof USER_LOGOUT_REQUEST;
}

interface IUserLogoutSuccessAction {
  readonly type: typeof USER_LOGOUT_SUCCESS;
}

interface IUserLogoutFailedAction {
  readonly type: typeof USER_LOGOUT_FAILED
}

interface IUserLoggedAction {
  readonly type: typeof USER_IS_LOGED;
}

export type TUserAuthActions =
  IUserLoginAction
  | IUserLoginSuccessAction
  | IUserLoginFailedAction
  | IUserLogoutAction
  | IUserLogoutSuccessAction
  | IUserLogoutFailedAction
  | IUserLoggedAction;

export const loginUser: AppThunk = (data: TUserWithoutName) => {
  return function (dispatch: AppDispatch) {
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
      .then((result: ILoginResponse) => {
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

export const logoutUser: AppThunk = () => {
  return function (dispatch: AppDispatch) {
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
