import {
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILED,
  REMOVE_USER_PROFILE,
  SET_USER_PROFILE_REQUEST,
  SET_USER_PROFILE_SUCCESS,
  SET_USER_PROFILE_FAILED,
  GET_NEW_TOKEN_REQUEST,
  GET_NEW_TOKEN_SUCCESS,
  GET_NEW_TOKEN_FAILED
} from '../actions/user-profile';

const initialState = {
  profileRequest: false,
  profileFailed: false,
  user: {
    name: '',
    email: ''
  },
  isUserLoaded: false,

  setProfileRequest: false,
  setProfileFailed: false,

  getNewTokenRequest: false,
  getNewTokenFailed: false
};

export const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST: {
      return {
        ...state,
        profileRequest: true
      };
    }
    case USER_PROFILE_SUCCESS: {
      return {
        ...state,
        profileRequest: false,
        user: action.payload.user,
        isUserLoaded: true
      };
    }
    case USER_PROFILE_FAILED: {
      return {
        ...state,
        ...initialState,
        profileFailed: true
      };
    }
    case REMOVE_USER_PROFILE: {
      return {
        ...state,
        ...initialState
      };
    }

    case SET_USER_PROFILE_REQUEST: {
      return {
        ...state,
        setProfileRequest: true
      };
    }
    case SET_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        setProfileRequest: false
      };
    }
    case SET_USER_PROFILE_FAILED: {
      return {
        ...state,
        setProfileRequest: false,
        setProfileFailed: true
      };
    }

    case GET_NEW_TOKEN_REQUEST: {
      return {
        ...state,
        getNewTokenRequest: true
      };
    }
    case GET_NEW_TOKEN_SUCCESS: {
      return {
        ...state,
        getNewTokenRequest: false
      };
    }
    case GET_NEW_TOKEN_FAILED: {
      return {
        ...state,
        getNewTokenRequest: false,
        getNewTokenFailed: true
      };
    }
    default: {
      return state;
    }
  }
};
