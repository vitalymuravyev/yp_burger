import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILED,
  USER_IS_LOGED, TUserAuthActions
} from '../actions/user-auth';

export type TUserAuthState = {
  isUserAuth: boolean;
  accessToken: string,

  loginRequest: boolean,
  loginFailed: boolean,

  logoutRequest: boolean,
  logoutFailed: boolean,
}

const initialState: TUserAuthState = {
  isUserAuth: false,
  accessToken: '',

  loginRequest: false,
  loginFailed: false,

  logoutRequest: false,
  logoutFailed: false,
};

export const userAuthReducer = (state = initialState, action: TUserAuthActions) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true
      };
    }
    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        isUserAuth: true,
        accessToken: action.payload.accessToken
      };
    }
    case USER_LOGIN_FAILED: {
      return {
        ...state,
        ...initialState,
        loginFailed: true
      };
    }
    case USER_LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true
      };
    }
    case USER_LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        isUserAuth: false
      };
    }
    case USER_LOGOUT_FAILED: {
      return {
        ...state,
        ...initialState,
        logoutFailed: true
      };
    }
    case USER_IS_LOGED: {
      return {
        ...state,
        isUserAuth: true
      };
    }
    default: {
      return state;
    }
  }
};
