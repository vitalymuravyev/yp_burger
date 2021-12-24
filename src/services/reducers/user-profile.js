import {
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILED
} from '../actions/user-profile';

const initialState = {
  profileRequest: false,
  profileFailed: false,
  user: {
    name: '',
    email: ''
  }
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
        user: action.payload.user
      };
    }
    case USER_PROFILE_FAILED: {
      return {
        ...state,
        ...initialState,
        profileFailed: true
      };
    }
    default: {
      return state;
    }
  }
};
