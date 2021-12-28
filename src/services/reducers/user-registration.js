import {
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_FAILED,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
} from '../actions/user-registration';

const initialState = {
  registrationRequest: false,
  registrationFailed: false,

  sendEmailRequest: false,
  sendEmailFailed: false,
  isEmailSent: false,

  resetPasswordRequest: false,
  resetPasswordFailed: false,
  isPasswordChanged: false
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
      };
    }
    case USER_REGISTRATION_FAILED: {
      return {
        ...state,
        ...initialState,
        registrationFailed: true
      };
    }

    case SEND_EMAIL_REQUEST: {
      return {
        ...state,
        sendEmailRequest: true
      };
    }
    case SEND_EMAIL_SUCCESS: {
      return {
        ...state,
        sendEmailRequest: false,
        isEmailSent: true
      };
    }
    case SEND_EMAIL_FAILED: {
      return {
        ...state,
        ...initialState,
        sendEmailFailed: true
      };
    }

    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        isPasswordChanged: true
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        ...initialState,
        resetPasswordFailed: true
      };
    }
    default: {
      return state;
    }
  }
};
