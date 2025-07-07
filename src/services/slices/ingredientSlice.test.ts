import reducer, { getIngredients, TInitialState } from './ingredientSlice';
import { TIngredientsResponse } from '@api';

let baseState: TInitialState = {} as TInitialState;
let ingredientData = {} as TIngredientsResponse;

beforeEach(() => {
  baseState = {
    data: [],
    isLoading: false,
    error: null
  };

  ingredientData = {
    success: true,
    data: [
      {
        _id: '1',
        name: 'Ingredient 1',
        type: 'bun',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 100,
        price: 50,
        image: 'image1.png',
        image_large: 'image1_large.png',
        image_mobile: 'image1_mobile.png'
      }
    ]
  };
});

describe('ingredientSlice — getIngredients.fulfilled', () => {
  it('Ингредиенты пришли', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: ingredientData
    };

    const nextState = reducer(baseState, action);

    expect(nextState.data).toEqual(ingredientData);
    expect(nextState.isLoading).toBe(false);
  });
});

describe('ingredientSlice — getIngredients.rejected', () => {
  it('Ингредиенты не пришли', () => {
    const action = {
      type: getIngredients.rejected.type,
      payload: ingredientData
    };

    const nextState = reducer(baseState, action);

    expect(nextState.error).toBe('Ошибка');
    expect(nextState.isLoading).toBe(false);
  });
});

describe('ingredientSlice — getIngredients.pending', () => {
  it('Ингредиенты идут', () => {
    const action = {
      type: getIngredients.pending.type,
      payload: ingredientData
    };

    const nextState = reducer(baseState, action);

    expect(nextState.isLoading).toBe(true);
  });
});
