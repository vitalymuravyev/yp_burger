import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED
} from '../actions/user-login';

const initialState = {
  loginRequest: false,
  loginFailed: false,
  accessToken: '',
  refreshToken: ''
};

export const userLoginReducer = (state = initialState, action) => {
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
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    }
    case USER_LOGIN_FAILED: {
      return {
        ...state,
        ...initialState,
        loginFailed: true
      };
    }
    default: {
      return state;
    }
  }
};
