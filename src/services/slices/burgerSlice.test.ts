//TODO: разобраться и доделать все это

import {
  burgerSlice,
  moveDownIngredient,
  moveUpIngredient,
  removeIngredient,
  TInitialState
} from './burgerSlice';
import { UnknownAction } from '@reduxjs/toolkit';
import { fetchOrder } from './orderSlice';
import reducer from './burgerSlice';

const addIngredient = burgerSlice.actions.addIngredient;

let testIngredient = {};
let testIngredients = {
  main: {
    id: '123',
    _id: '123',
    name: 'клубника вкусная',
    type: 'main',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 100,
    price: 100,
    image: 'https://example.com/image.png',
    image_large: 'https://example.com/image.png',
    image_mobile: 'https://example.com/image.png'
  },
  sauce: {
    id: '124',
    _id: '124',
    name: 'Соус острый',
    type: 'sauce',
    proteins: 5,
    fat: 5,
    carbohydrates: 5,
    calories: 50,
    price: 50,
    image: 'https://example.com/image.png',
    image_large: 'https://example.com/image.png',
    image_mobile: 'https://example.com/image.png'
  }
};

beforeEach(() => {
  testIngredient = {
    _id: '123',
    name: 'Булка вкусная',
    type: 'bun',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 100,
    price: 100,
    image: 'https://example.com/image.png',
    image_large: 'https://example.com/image.png',
    image_mobile: 'https://example.com/image.png'
  };

  testIngredients = {
    main: {
      id: '123',
      _id: '123',
      name: 'клубника вкусная',
      type: 'main',
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 100,
      price: 100,
      image: 'https://example.com/image.png',
      image_large: 'https://example.com/image.png',
      image_mobile: 'https://example.com/image.png'
    },
    sauce: {
      id: '124',
      _id: '124',
      name: 'Соус острый',
      type: 'sauce',
      proteins: 5,
      fat: 5,
      carbohydrates: 5,
      calories: 50,
      price: 50,
      image: 'https://example.com/image.png',
      image_large: 'https://example.com/image.png',
      image_mobile: 'https://example.com/image.png'
    }
  };
});

describe('burgerSlice — addIngredient', () => {
  const baseState: TInitialState = {
    error: null,
    constructorItems: {
      bun: null,
      ingredients: []
    }
  };

  it('добавляет булку в state.constructorItems.bun', () => {
    const action = addIngredient(testIngredient);
    const nextState = reducer(baseState, action as UnknownAction);

    expect(nextState.constructorItems.bun).toMatchObject(testIngredient);
    expect(typeof nextState.constructorItems.bun?.id).toBe('string');
  });

  it('добавляет не-булку в список ингредиентов', () => {
    const sauceIngredient = { ...testIngredient, type: 'sauce' as const };
    const action = addIngredient(sauceIngredient);
    const nextState = reducer(baseState, action as UnknownAction);

    expect(nextState.constructorItems.ingredients).toHaveLength(1);
    expect(nextState.constructorItems.ingredients[0]).toMatchObject(
      sauceIngredient
    );
    expect(typeof nextState.constructorItems.ingredients[0].id).toBe('string');
  });
});

describe('burgerSlice — moveUpIngredient', () => {
  const baseState = {
    error: null,
    constructorItems: {
      bun: null,
      ingredients: [testIngredients.main, testIngredients.sauce]
    }
  };

  it('перемещает ингредиент вверх по списку', () => {
    const action = moveUpIngredient(testIngredients.sauce._id);

    const nextState = reducer(baseState, action as UnknownAction);

    expect(nextState.constructorItems.ingredients).toHaveLength(2);

    expect(nextState.constructorItems.ingredients[0]).toMatchObject(
      testIngredients.sauce
    );

    expect(nextState.constructorItems.ingredients[1]).toMatchObject(
      testIngredients.main
    );
  });
});

describe('burgerSlice — moveDownIngredient', () => {
  const baseState = {
    error: null,
    constructorItems: {
      bun: null,
      ingredients: [testIngredients.main, testIngredients.sauce]
    }
  };

  it('перемещает ингредиент вниз по списку', () => {
    const action = moveDownIngredient(testIngredients.main._id);

    const nextState = reducer(baseState, action as UnknownAction);

    expect(nextState.constructorItems.ingredients).toHaveLength(2);

    expect(nextState.constructorItems.ingredients[0]).toMatchObject(
      testIngredients.sauce
    );

    expect(nextState.constructorItems.ingredients[1]).toMatchObject(
      testIngredients.main
    );
  });
});

describe('burgerSlice — removeIngredient', () => {
  const baseState = {
    error: null,
    constructorItems: {
      bun: null,
      ingredients: [testIngredients.main, testIngredients.sauce]
    }
  };

  it('Удаляем ингредиент', () => {
    const action = removeIngredient(testIngredients.main.id);

    const nextState = reducer(baseState, action as UnknownAction);

    expect(nextState.constructorItems.ingredients).toHaveLength(1);

    expect(nextState.constructorItems.ingredients[0]).toMatchObject(
      testIngredients.sauce
    );
  });
});

describe('burgerSlice — fetchOrder.fulfilled', () => {
  const baseState = {
    error: null,
    constructorItems: {
      bun: 'testBun',
      ingredients: [testIngredients.main, testIngredients.sauce]
    }
  };

  it('Заказ пришел', () => {
    const action = {
      type: fetchOrder.fulfilled.type,
      payload: {
        success: true,
        order: { number: 666 }
      }
    };

    const nextState = reducer(baseState, action as UnknownAction);

    expect(nextState.constructorItems.bun).toBeNull();
    expect(nextState.constructorItems.ingredients).toEqual([]);
  });
});
