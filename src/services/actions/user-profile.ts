import Cookies from "js-cookie";

import {ThunkAction} from "redux-thunk";
import {Action} from "redux";
import {API_URL, TOKEN_LIFE_TIME} from "../../utils/constants";
import { checkResponseStatus } from "../../utils/helpers";
import {AppDispatch, AppThunk, IUserInfo, RootState, TApplicationActions} from "../../utils/types";

export const USER_PROFILE_REQUEST = 'USER_PROFILE_REQUEST';
export const USER_PROFILE_SUCCESS = 'USER_PROFILE_SUCCESS';
export const USER_PROFILE_FAILED = 'USER_PROFILE_FAILED';

export const SET_USER_PROFILE_REQUEST = 'SET_USER_PROFILE_REQUEST';
export const SET_USER_PROFILE_SUCCESS = 'SET_USER_PROFILE_SUCCESS';
export const SET_USER_PROFILE_FAILED = 'SET_USER_PROFILE_FAILED';

export const REMOVE_USER_PROFILE = 'REMOVE_USER_PROFILE';

export const GET_NEW_TOKEN_REQUEST = 'GET_NEW_TOKEN_REQUEST';
export const GET_NEW_TOKEN_SUCCESS = 'GET_NEW_TOKEN_SUCCESS';
export const GET_NEW_TOKEN_FAILED = 'GET_NEW_TOKEN_FAILED';

interface IGetUserProfileAction {
  readonly type: typeof USER_PROFILE_REQUEST;
}
interface IGetUserProfileSuccessAction {
  readonly type: typeof USER_PROFILE_SUCCESS;
  payload: {
    success: boolean;
    user: IUserInfo
  }
}
interface IGetUserProfileFailedAction {
  readonly type: typeof USER_PROFILE_FAILED;
}

interface ISetUserProfileAction {
  readonly type: typeof SET_USER_PROFILE_REQUEST;
}
interface ISetUserProfileSuccessAction {
  readonly type: typeof SET_USER_PROFILE_SUCCESS;
}
interface ISetUserProfileFailedAction {
  readonly type: typeof SET_USER_PROFILE_FAILED;
}

interface IRemoveUserProfileAction {
  readonly type: typeof REMOVE_USER_PROFILE;
}

interface IGetNewTokenAction {
  readonly type: typeof GET_NEW_TOKEN_REQUEST;
}
interface IGetNewTokenSuccessAction {
  readonly type: typeof GET_NEW_TOKEN_SUCCESS;
}
interface IGetNewTokenFailedAction {
  readonly type: typeof GET_NEW_TOKEN_FAILED;
}

export type TUserProfileActions =
  IGetUserProfileAction
  | IGetUserProfileSuccessAction
  | IGetUserProfileFailedAction
  | ISetUserProfileAction
  | ISetUserProfileSuccessAction
  | ISetUserProfileFailedAction
  | IRemoveUserProfileAction
  | IGetNewTokenAction
  | IGetNewTokenSuccessAction
  | IGetNewTokenFailedAction;

const getNewToken: AppThunk = (nextStep) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_NEW_TOKEN_REQUEST
    });
    fetch(`${API_URL}/auth/token`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    })
      .then(res => checkResponseStatus(res))
      .then(res => res.json())
      .then(res => {
        dispatch({
          type: GET_NEW_TOKEN_SUCCESS
        });
        localStorage.setItem('refreshToken', res.refreshToken);
        Cookies.set('accessToken', res.accessToken, { expires: TOKEN_LIFE_TIME });
        dispatch(nextStep);
      })
      .catch(() => {
        dispatch({
          type: GET_NEW_TOKEN_FAILED
        });
      });
  };
};

export const getUserProfile: AppThunk = () => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json;charset=utf-8');
  headers.append('authorization', Cookies.get('accessToken') || '');
  return function (dispatch) {
    dispatch({
      type: USER_PROFILE_REQUEST
    });
    fetch(`${API_URL}/auth/user`, {
      method: 'GET',
      mode: 'cors',
      headers
    })
      .then(res => res.json())
      .then(result => {
        if (!result.success) throw result;
        dispatch({
          type: USER_PROFILE_SUCCESS,
          payload: result
        });
      })
      .catch((res) => {
        if (res.message === 'You should be authorised') {
          dispatch(getNewToken(getUserProfile()));
        } else {
          dispatch({
            type: USER_PROFILE_FAILED
          });
        }
      });
  };
};

export const setUserProfile: AppThunk = (data: IUserInfo) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json;charset=utf-8');
  headers.append('authorization', Cookies.get('accessToken') || '');
  return function (dispatch) {
    dispatch({
      type: SET_USER_PROFILE_REQUEST
    });
    fetch(`${API_URL}/auth/user`, {
      method: 'PATCH',
      mode: 'cors',
      headers,
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => {
        if (!result.success) throw result;
        dispatch({
          type: SET_USER_PROFILE_SUCCESS,
          payload: result
        });
      })
      .catch((res) => {
        if (res.message === 'You should be authorised') {
          dispatch(getNewToken(setUserProfile(data)));
        } else {
          dispatch({
            type: SET_USER_PROFILE_FAILED
          });
        }
      });
  };
};
