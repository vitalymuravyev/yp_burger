import {burgerReducer as reducer, TBurger} from "./burger-constructor";
import {ADD_BURGER_ITEM, DRAG_ITEM, REMOVE_BURGER_ITEM, RESET_BURGER} from "../actions/burger-constructor";


const initialState: TBurger = {
  bun: '',
  ingredients: [],
  counter: 0
};

const burger: TBurger = {
  bun: {
    _id: "60d3b41abdacab0026a733c7",
    name: "Флюоресцентная булка R2-D3",
    type: "bun",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
  },
  ingredients: [
    {
      _id: "60d3b41abdacab0026a733cd",
      name: "Соус фирменный Space Sauce",
      type: "sauce",
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: "https://code.s3.yandex.net/react/code/sauce-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
      orderIndex: 0,
    },
  ],
  counter: 1
};

describe('Burger constructor reducer', () => {
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

  test('Should handle RESET_BURGER', () => {
    expect(reducer(undefined, { type: RESET_BURGER})).toEqual(initialState);
  });

  test('Should handle REMOVE_BURGER_ITEM', () => {
    expect(reducer(burger, {
      type: REMOVE_BURGER_ITEM,
      item: {orderIndex: 0} as any
    })).toEqual({
      bun: {
        _id: "60d3b41abdacab0026a733c7",
        name: "Флюоресцентная булка R2-D3",
        type: "bun",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
      },
      ingredients: [
      ],
      counter: 1
    });
  });

  test('Should handle ADD_BURGER_ITEM add bun', () => {
    expect(reducer(initialState, {
      type: ADD_BURGER_ITEM,
      payload: {
        _id: "60d3b41abdacab0026a733c7",
        name: "Флюоресцентная булка R2-D3",
        type: "bun",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
      }
    })).toEqual({
      bun: {
        _id: "60d3b41abdacab0026a733c7",
        name: "Флюоресцентная булка R2-D3",
        type: "bun",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
      },
      ingredients: [
      ],
      counter: 0
    });
  });

  test('Should handle ADD_BURGER_ITEM add ingredient', () => {
    expect(reducer(initialState, {
      type: ADD_BURGER_ITEM,
      payload: {
        _id: "60d3b41abdacab0026a733cd",
        name: "Соус фирменный Space Sauce",
        type: "sauce",
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: "https://code.s3.yandex.net/react/code/sauce-04.png",
        image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
        orderIndex: 0,
      }
    })).toEqual({
      bun: '',
      ingredients: [
        {
          _id: "60d3b41abdacab0026a733cd",
          name: "Соус фирменный Space Sauce",
          type: "sauce",
          proteins: 50,
          fat: 22,
          carbohydrates: 11,
          calories: 14,
          price: 80,
          image: "https://code.s3.yandex.net/react/code/sauce-04.png",
          image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
          image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
          orderIndex: 0,
        }
      ],
      counter: 1
    });
  });

});
