import {orderDetailsReducer as reducer, TOrderDetailsState} from './order-details';
import {
  CLOSE_ERROR,
  PUT_ORDER_INFO_FAILED,
  PUT_ORDER_INFO_REQUEST,
  PUT_ORDER_INFO_SUCCESS,
  REMOVE_ORDER_INFO
} from "../actions/order-details";

const initialState: TOrderDetailsState = {
  id: 0,
  name: '',
  orderRequest: false,
  orderFailed: false
};

describe('Order detail reducer', () => {
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

  test('Should handle PUT_ORDER_INFO_REQUEST', () => {
    expect(reducer(undefined, { type: PUT_ORDER_INFO_REQUEST}))
      .toEqual({
        ...initialState,
        orderRequest: true
      });
  });

  test('Should handle PUT_ORDER_INFO_SUCCESS', () => {
    expect(reducer(undefined, {
      type: PUT_ORDER_INFO_SUCCESS,
      payload: {
        order: {
          number: 1111,
        },
        name: 'Vasya',
      }
    })).toEqual({
      ...initialState,
      id: 1111,
      name: 'Vasya'
    });
  });

  test('Should handle PUT_ORDER_INFO_FAILED', () => {
    expect(reducer(undefined, { type: PUT_ORDER_INFO_FAILED}))
      .toEqual({
        ...initialState,
        orderFailed: true
      });
  });

  test('Should handle REMOVE_ORDER_INFO', () => {
    expect(reducer(undefined, { type: REMOVE_ORDER_INFO}))
      .toEqual(initialState);
  });

  test('Should handle CLOSE_ERROR', () => {
    expect(reducer(undefined, { type: CLOSE_ERROR}))
      .toEqual({
        ...initialState,
        orderFailed: false
      });
  });
});
