import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILED
} from '../actions/user-auth';

const initialState = {
  isUserAuth: false,
  accessToken: '',

  loginRequest: false,
  loginFailed: false,

  logoutRequest: false,
  logoutFailed: false,
};

export const userAuthReducer = (state = initialState, action) => {
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
    default: {
      return state;
    }
  }
};
