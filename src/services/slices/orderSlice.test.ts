import { TOrdersResponse } from '@api';
import { TOrder } from '@utils-types';
import reducer, { clearOrder, fetchOrder, TInitialState } from './orderSlice';
import { UnknownAction } from '@reduxjs/toolkit';

let baseState: TInitialState = {} as TInitialState;
let orderData = {} as TOrdersResponse;

beforeEach(() => {
  baseState = {
    orderRequest: false,
    orderModalData: null,
    orderByNumber: null,
    isOrderByNumberLoading: false,
    orderByNumberError: null,
    newOrderData: null,
    isNewOrderLoading: false,
    newOrderError: null
  };

  orderData = {
    data: [
      {
        _id: '1',
        name: 'Burger',
        ingredients: ['bun', 'patty', 'cheese'],
        status: 'done',
        createdAt: '2021-01-01T00:00:00.000Z',
        updatedAt: '2021-01-01T00:00:00.000Z',
        number: 1
      }
    ] as TOrder[],
    success: true
  };
});

describe('orderSlice — clearOrder', () => {
  it('Очистка заказа', () => {
    const action = clearOrder('TestOrderId');

    const nextState = reducer(baseState, action as UnknownAction);

    expect(nextState.orderRequest).toBe(false);
    expect(nextState.orderModalData).toBeNull();
    expect(nextState.newOrderData).toBeNull();
  });
});

describe('orderSlice — fetchOrder.fulfilled', () => {
  it('Заказ пришел', () => {
    const action = {
      type: fetchOrder.fulfilled.type,
      payload: orderData.data[0]
    };

    const nextState = reducer(baseState, action);

    expect(nextState.orderRequest).toBe(false);
    expect(nextState.orderModalData).toEqual(orderData.data[0]);
    expect(nextState.isNewOrderLoading).toBe(false);
  });
});

describe('orderSlice — fetchOrder.rejected', () => {
  it('Заказ не пришел', () => {
    const action = {
      type: fetchOrder.rejected.type,
      payload: orderData.data[0]
    };

    const nextState = reducer(baseState, action);

    expect(nextState.orderRequest).toBe(false);
    expect(nextState.orderModalData).toBeNull();
    expect(nextState.isNewOrderLoading).toBe(false);
  });
});

describe('orderSlice — fetchOrder.pending', () => {
  it('Заказ идет', () => {
    const action = {
      type: fetchOrder.pending.type
    };

    const nextState = reducer(baseState, action);

    expect(nextState.orderRequest).toBe(true);
    expect(nextState.isNewOrderLoading).toBe(true);
  });
});
