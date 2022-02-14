import {TBurgerIngredientState} from "./burger-ingredients";
import { ingredientsReducer as reducer } from './burger-ingredients';
import {CLOSE_ERROR, PUT_ORDER_INFO_REQUEST} from "../actions/order-details";
import {GET_ITEMS_FAILED, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS} from "../actions/burger-ingredients";
import {TIngredient} from "../../utils/types";

const initialState: TBurgerIngredientState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
};

const data: TIngredient[] = [
  {
    "_id":"60666c42cc7b410027a1a9b1",
    "name":"Краторная булка N-200i",
    "type":"bun",
    "proteins":80,
    "fat":24,
    "carbohydrates":53,
    "calories":420,
    "price":1255,
    "image":"https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
  },
  {
    "_id":"60666c42cc7b410027a1a9b5",
    "name":"Говяжий метеорит (отбивная)",
    "type":"main",
    "proteins":800,
    "fat":800,
    "carbohydrates":300,
    "calories":2674,
    "price":3000,
    "image":"https://code.s3.yandex.net/react/code/meat-04.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
  },
  {
    "_id":"60666c42cc7b410027a1a9b6",
    "name":"Биокотлета из марсианской Магнолии",
    "type":"main",
    "proteins":420,
    "fat":142,
    "carbohydrates":242,
    "calories":4242,
    "price":424,
    "image":"https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png",
  },
  {
    "_id":"60666c42cc7b410027a1a9b7",
    "name":"Соус Spicy-X",
    "type":"sauce",
    "proteins":30,
    "fat":20,
    "carbohydrates":40,
    "calories":30,
    "price":90,
    "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png",
  },
];

const dataWithCount = data.map(item => ({...item, counter: 0}));

describe('Burger ingredient reducer', () => {
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

  test('Should handle CLOSE_ERROR', () => {
    expect(reducer(undefined, { type: CLOSE_ERROR}))
      .toEqual({
        ...initialState,
        itemsFailed: false
      });
  });

  test('Should handle GET_ITEMS_FAILED', () => {
    expect(reducer(undefined, { type: GET_ITEMS_FAILED}))
      .toEqual({
        ...initialState,
        itemsFailed: true
      });
  });

  test('Should handle GET_ITEMS_SUCCESS', () => {
    expect(reducer(undefined, {
      type: GET_ITEMS_SUCCESS,
      items: data,
    }))
      .toEqual({
        ...initialState,
        items: dataWithCount
      });
  });

  test('Should handle GET_ITEMS_REQUEST', () => {
    expect(reducer(undefined, { type: GET_ITEMS_REQUEST}))
      .toEqual({
        ...initialState,
        itemsRequest: true
      });
  });
});
