import {
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAILED
} from '../actions/user-registration';

const initialState = {
  registrationRequest: false,
  registrationFailed: false,
  token: '',
  refreshToken: '',
  user: {
    name: '',
    email: '',
  }
};

export const userRegistrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTRATION_REQUEST: {
      return {
        ...state,
        registrationRequest: true
      };
    }
    case USER_REGISTRATION_SUCCESS: {
      return {
        ...state,
        registrationRequest: false,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        user: action.payload.user
      };
    }
    case USER_REGISTRATION_FAILED: {
      return {
        ...state,
        ...initialState
      };
    }
    default: {
      return state;
    }
  }
};

// "76c0f184d1b7b28f564651234493d236768f7fbe88b6f8e6a6495872c4ddc532519307facd7356e0"
