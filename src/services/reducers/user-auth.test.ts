import {TUserAuthState} from "./user-auth";
import {userAuthReducer as reducer} from "./user-auth";
import {CLOSE_ERROR} from "../actions/order-details";
import {
  USER_IS_LOGED,
  USER_LOGIN_FAILED, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAILED,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS
} from "../actions/user-auth";
import {ILoginResponse} from "../../utils/types";


const initialState: TUserAuthState = {
  isUserAuth: false,
  accessToken: '',

  loginRequest: false,
  loginFailed: false,

  logoutRequest: false,
  logoutFailed: false,
};

const authResponce: ILoginResponse = {
  accessToken: 'userToken12',
  refreshToken: 'userToken22',
  success: true,
  user: {email: 'mail'}
};

describe('User auth reducer', () => {
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

  test('Should handle USER_IS_LOGED', () => {
    expect(reducer(undefined, { type: USER_IS_LOGED}))
      .toEqual({
        ...initialState,
        isUserAuth: true
      });
  });

  test('Should handle USER_LOGOUT_FAILED', () => {
    expect(reducer(undefined, { type: USER_LOGOUT_FAILED}))
      .toEqual({
        ...initialState,
        logoutFailed: true
      });
  });

  test('Should handle USER_LOGOUT_SUCCESS', () => {
    expect(reducer(undefined, { type: USER_LOGOUT_SUCCESS}))
      .toEqual({
        ...initialState,
        logoutRequest: false,
        isUserAuth: false
      });
  });

  test('Should handle USER_LOGOUT_REQUEST', () => {
    expect(reducer(undefined, { type: USER_LOGOUT_REQUEST}))
      .toEqual({
        ...initialState,
        logoutRequest: true
      });
  });

  test('Should handle USER_LOGIN_FAILED', () => {
    expect(reducer(undefined, { type: USER_LOGIN_FAILED}))
      .toEqual({
        ...initialState,
        loginFailed: true
      });
  });

  test('Should handle USER_LOGIN_SUCCESS', () => {
    expect(reducer(undefined, {
      type: USER_LOGIN_SUCCESS,
      payload: {
        accessToken: 'userToken12',
        refreshToken: 'userToken22',
        success: true,
        user: {email: 'mail'}
      }
    }))
      .toEqual({
        ...initialState,
        accessToken: authResponce.accessToken,
        isUserAuth: true
      });
  });

  test('Should handle USER_LOGIN_REQUEST', () => {
    expect(reducer(undefined, { type: USER_LOGIN_REQUEST}))
      .toEqual({
        ...initialState,
        loginRequest: true
      });
  });
});
