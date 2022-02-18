import {TIngredientInfoState} from "./ingredient-card";
import { ingredientCardReducer as reducer } from './ingredient-card';
import {PUT_ORDER_INFO_REQUEST} from "../actions/order-details";
import {ADD_ITEM_INFO, ADD_ITEM_INFO_PAGE, REMOVE_ITEM_INFO} from "../actions/ingredient-card";
import {IIngredientDetails} from "../../utils/types";

const initialState: TIngredientInfoState = {
  details: {
    image_large: '',
    name: '',
    calories: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0
  },
  isDetailsVisible: false
};

const ingredient: IIngredientDetails = {
  image_large: 'image',
  name: 'image',
  calories: 200,
  proteins: 200,
  fat: 200,
  carbohydrates: 200
};

describe('Ingredient card reducer', () => {
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

  test('Should handle REMOVE_ITEM_INFO', () => {
    expect(reducer(undefined, { type: REMOVE_ITEM_INFO}))
      .toEqual(initialState);
  });

  test('Should handle ADD_ITEM_INFO_PAGE', () => {
    expect(reducer(undefined, {
      type: ADD_ITEM_INFO_PAGE,
      payload: {
        ...ingredient
      }
    }))
      .toEqual({
        ...initialState,
        details: {
          ...ingredient
        }
      });
  });

  test('Should handle ADD_ITEM_INFO', () => {
    expect(reducer(undefined, {
      type: ADD_ITEM_INFO,
      payload: {
        ...ingredient
      }
    }))
      .toEqual({
        ...initialState,
        details: {
          ...ingredient
        },
        isDetailsVisible: true
      });
  });
});
