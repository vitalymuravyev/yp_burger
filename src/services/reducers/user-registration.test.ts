import {IUserRegistrationState} from "./user-registration";
import { userRegistrationReducer as reducer } from './user-registration';
import {
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  SEND_EMAIL_FAILED,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  USER_REGISTRATION_FAILED,
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS
} from "../actions/user-registration";


const initialState: IUserRegistrationState = {
  registrationRequest: false,
  registrationFailed: false,

  sendEmailRequest: false,
  sendEmailFailed: false,
  isEmailSent: false,

  resetPasswordRequest: false,
  resetPasswordFailed: false,
  isPasswordChanged: false
};

describe('User registration reducer', () => {
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

  test('Should handle RESET_PASSWORD_FAILED', () => {
    expect(reducer(undefined, { type: RESET_PASSWORD_FAILED}))
      .toEqual({
        ...initialState,
        resetPasswordFailed: true
      });
  });

  test('Should handle RESET_PASSWORD_SUCCESS', () => {
    expect(reducer(undefined, { type: RESET_PASSWORD_SUCCESS}))
      .toEqual({
        ...initialState,
        resetPasswordRequest: false,
        isPasswordChanged: true
      });
  });

  test('Should handle RESET_PASSWORD_REQUEST', () => {
    expect(reducer(undefined, { type: RESET_PASSWORD_REQUEST}))
      .toEqual({
        ...initialState,
        resetPasswordRequest: true
      });
  });

  test('Should handle SEND_EMAIL_FAILED', () => {
    expect(reducer(undefined, { type: SEND_EMAIL_FAILED}))
      .toEqual({
        ...initialState,
        sendEmailFailed: true
      });
  });

  test('Should handle SEND_EMAIL_SUCCESS', () => {
    expect(reducer(undefined, { type: SEND_EMAIL_SUCCESS}))
      .toEqual({
        ...initialState,
        sendEmailRequest: false,
        isEmailSent: true
      });
  });

  test('Should handle SEND_EMAIL_REQUEST', () => {
    expect(reducer(undefined, { type: SEND_EMAIL_REQUEST}))
      .toEqual({
        ...initialState,
        sendEmailRequest: true,
      });
  });

  test('Should handle USER_REGISTRATION_FAILED', () => {
    expect(reducer(undefined, { type: USER_REGISTRATION_FAILED}))
      .toEqual({
        ...initialState,
        registrationFailed: true
      });
  });

  test('Should handle USER_REGISTRATION_SUCCESS', () => {
    expect(reducer(undefined, { type: USER_REGISTRATION_SUCCESS}))
      .toEqual({
        ...initialState,
        registrationRequest: false,
      });
  });

  test('Should handle USER_REGISTRATION_REQUEST', () => {
    expect(reducer(undefined, { type: USER_REGISTRATION_REQUEST}))
      .toEqual({
        ...initialState,
        registrationRequest: true,
      });
  });
});
