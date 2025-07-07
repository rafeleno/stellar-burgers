import reducer, { getFeed, TInitialState } from './feedSlice';
import { TFeedsResponse } from '@api';

let feedData: TFeedsResponse = {} as TFeedsResponse;
let baseState: TInitialState = {} as TInitialState;

beforeEach(() => {
  baseState = {
    orders: null,
    total: 0,
    totalToday: 0,
    error: null,
    isLoading: true
  };

  feedData = {
    success: true,
    orders: [
      {
        _id: '1',
        status: 'done',
        name: 'Burger',
        createdAt: '2021-01-01T00:00:00.000Z',
        updatedAt: '2021-01-01T00:00:00.000Z',
        number: 1,
        ingredients: ['bun', 'patty', 'cheese']
      },
      {
        _id: '2',
        status: 'done',
        name: 'Burger',
        createdAt: '2021-01-01T00:00:00.000Z',
        updatedAt: '2021-01-01T00:00:00.000Z',
        number: 2,
        ingredients: ['bun', 'patty', 'cheese']
      }
    ],
    total: 666,
    totalToday: 666
  };
});

describe('feedSlice — getFeed.fulfilled', () => {
  it('Заказы для ленты пришли', () => {
    const action = {
      type: getFeed.fulfilled.type,
      payload: feedData
    };

    const nextState = reducer(baseState, action);

    expect(nextState.orders).toEqual(feedData.orders);
    expect(nextState.total).toBe(feedData.total);
    expect(nextState.totalToday).toBe(feedData.totalToday);
    expect(nextState.isLoading).toBe(false);
  });
});

describe('feedSlice — getFeed.rejected', () => {
  it('Заказы для ленты не пришли', () => {
    const action = {
      type: getFeed.rejected.type,
      payload: feedData
    };

    const nextState = reducer(baseState, action);

    expect(nextState.orders).toBeNull();
    expect(nextState.total).toBe(0);
    expect(nextState.totalToday).toBe(0);
    expect(nextState.isLoading).toBe(false);
  });
});

describe('feedSlice — getFeed.pending', () => {
  it('Заказы идут', () => {
    const action = {
      type: getFeed.pending.type
    };

    const nextState = reducer(baseState, action);

    expect(nextState.isLoading).toBe(true);
  });
});
