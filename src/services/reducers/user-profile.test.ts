import {IUserProfileState} from "./user-profile";
import { userProfileReducer as reducer } from './user-profile';
import {
  GET_NEW_TOKEN_FAILED,
  GET_NEW_TOKEN_REQUEST,
  GET_NEW_TOKEN_SUCCESS,
  REMOVE_USER_PROFILE,
  SET_USER_PROFILE_FAILED,
  SET_USER_PROFILE_REQUEST,
  SET_USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILED,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS
} from "../actions/user-profile";


const initialState: IUserProfileState = {
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

const user = {
  email: 'mail',
  name: 'Vasya'
};

describe('User profile reducer', () => {
  beforeEach(() => {
    // @ts-ignore
    return jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({result: 'OK'}),
      ok: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Should return initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  test('Should handle GET_NEW_TOKEN_FAILED', () => {
    expect(reducer(undefined, { type: GET_NEW_TOKEN_FAILED}))
      .toEqual({
        ...initialState,
        getNewTokenRequest: false,
        getNewTokenFailed: true
      });
  });

  test('Should handle GET_NEW_TOKEN_SUCCESS', () => {
    expect(reducer(undefined, { type: GET_NEW_TOKEN_SUCCESS}))
      .toEqual({
        ...initialState,
        getNewTokenRequest: false
      });
  });

  test('Should handle GET_NEW_TOKEN_REQUEST', () => {
    expect(reducer(undefined, { type: GET_NEW_TOKEN_REQUEST}))
      .toEqual({
        ...initialState,
        getNewTokenRequest: true
      });
  });

  test('Should handle SET_USER_PROFILE_FAILED', () => {
    expect(reducer(undefined, { type: SET_USER_PROFILE_FAILED}))
      .toEqual({
        ...initialState,
        setProfileRequest: false,
        setProfileFailed: true
      });
  });

  test('Should handle SET_USER_PROFILE_SUCCESS', () => {
    expect(reducer(undefined, { type: SET_USER_PROFILE_SUCCESS}))
      .toEqual({
        ...initialState,
        setProfileRequest: false
      });
  });

  test('Should handle SET_USER_PROFILE_REQUEST', () => {
    expect(reducer(undefined, { type: SET_USER_PROFILE_REQUEST}))
      .toEqual({
        ...initialState,
        setProfileRequest: true
      });
  });

  test('Should handle REMOVE_USER_PROFILE', () => {
    expect(reducer(undefined, { type: REMOVE_USER_PROFILE}))
      .toEqual({
        ...initialState
      });
  });

  test('Should handle USER_PROFILE_FAILED', () => {
    expect(reducer(undefined, { type: USER_PROFILE_FAILED}))
      .toEqual({
        ...initialState,
        profileFailed: true
      });
  });

  test('Should handle USER_PROFILE_SUCCESS', () => {
    expect(reducer(undefined, {
      type: USER_PROFILE_SUCCESS,
      payload: {
        user: {
          email: 'mail', name: 'Vasya'
        },
        success: true
      }
    }))
      .toEqual({
        ...initialState,
        profileRequest: false,
        isUserLoaded: true,
        user
      });
  });

  test('Should handle USER_PROFILE_REQUEST', () => {
    expect(reducer(undefined, { type: USER_PROFILE_REQUEST}))
      .toEqual({
        ...initialState,
        profileRequest: true
      });
  });
});
