import {
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILED
} from "../actions/user-logout";

const initialState = {
  logoutRequest: false,
  logoutFailed: false,
  logout: false
};

export const userLogoutReducer = (state = initialState, action) => {
  switch (action.type) {
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
        logout: action.payload.success
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
