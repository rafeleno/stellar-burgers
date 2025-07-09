import reducer, { getOrdersApiThunk, TInitialState } from './ordersSlice';
import { TOrder } from '@utils-types';

let baseState: TInitialState = {} as TInitialState;
let mockOrders: TOrder[];

beforeEach(() => {
  baseState = {
    orders: [],
    error: null,
    isLoading: false
  };

  mockOrders = [
    {
      _id: '1',
      name: 'Burger 1',
      ingredients: ['bun', 'patty', 'cheese'],
      status: 'done',
      createdAt: '2021-01-01T00:00:00.000Z',
      updatedAt: '2021-01-01T00:00:00.000Z',
      number: 1
    },
    {
      _id: '2',
      name: 'Burger 2',
      ingredients: ['bun', 'lettuce', 'cheese'],
      status: 'pending',
      createdAt: '2021-01-02T00:00:00.000Z',
      updatedAt: '2021-01-02T00:00:00.000Z',
      number: 2
    }
  ];
});

describe('ordersSlice — getOrdersApiThunk.fulfilled', () => {
  it('Заказы успешно пришли', () => {
    const action = {
      type: getOrdersApiThunk.fulfilled.type,
      payload: mockOrders
    };

    const nextState = reducer(baseState, action);
    expect(nextState.orders).toEqual(mockOrders);
    expect(nextState.isLoading).toBe(false);
  });
});

describe('ordersSlice — getOrdersApiThunk.rejected', () => {
  it('Ошибка при получении заказов', () => {
    const action = {
      type: getOrdersApiThunk.rejected.type
    };

    const nextState = reducer(baseState, action);
    expect(nextState.error).toBe('Ошибка');
    expect(nextState.isLoading).toBe(false);
  });
});

describe('ordersSlice — getOrdersApiThunk.pending', () => {
  it('Загрузка заказов', () => {
    const action = {
      type: getOrdersApiThunk.pending.type
    };

    const nextState = reducer(baseState, action);
    expect(nextState.isLoading).toBe(true);
  });
});
