import {IWsState} from "./ws-reducer";
import { wsOrderReducer as reducer } from './ws-reducer';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS, WS_GET_MESSAGE
} from "../actions/ws-action";
import {IOrderInfo} from "../../utils/types";


const initialState: IWsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  wsConnection: false,
  wsConnectionError: false,
  wsConnectionLoading: false
};

const orders: IOrderInfo[] = [
  {
    status: "created",
    ingredients: ['123', '456'],
    _id: 'qwerty',
    number: 1,
    createdAt: '2022-02-12',
    updatedAt: '2022-02-30',
    name: 'Order 1'
  },
  {
    status: "created",
    ingredients: ['1234', '4567'],
    _id: 'qwerty23',
    number: 2,
    createdAt: '2022-03-12',
    updatedAt: '2022-03-30',
    name: 'Order 2'
  }
];

describe('Websocket reducer', () => {
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

  test('Should handle WS_GET_MESSAGE', () => {
    expect(reducer(undefined, {
      type: WS_GET_MESSAGE,
      payload: {
        orders,
        total: 23,
        totalToday: 11,
        success: true
      }
    }))
      .toEqual({
        ...initialState,
        wsConnectionLoading: true,
        orders,
        total: 23,
        totalToday: 11
      });
  });

  test('Should handle WS_CONNECTION_CLOSED', () => {
    expect(reducer(undefined, {type: WS_CONNECTION_CLOSED}))
      .toEqual(initialState);
  });

  test('Should handle WS_CONNECTION_ERROR', () => {
    expect(reducer(undefined, {type: WS_CONNECTION_ERROR}))
      .toEqual({
        ...initialState,
        wsConnectionError: true
      });
  });

  test('Should handle WS_CONNECTION_SUCCESS', () => {
    expect(reducer(undefined, {type: WS_CONNECTION_SUCCESS}))
      .toEqual({
        ...initialState,
        wsConnection: true,
      });
  });

  test('Should handle WS_CONNECTION_START', () => {
    expect(reducer(undefined, {type: WS_CONNECTION_START}))
      .toEqual(initialState);
  });
});
