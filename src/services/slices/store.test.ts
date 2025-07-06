import { rootReducer } from '../store';

describe('rootReducer', () => {
  it('должен вернуть корректное начальное состояние', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toEqual({
      ingredients: {
        data: [],
        isLoading: false,
        error: null
      },
      burger: {
        error: null,
        constructorItems: {
          bun: null,
          ingredients: []
        }
      },
      order: {
        orderRequest: false,
        orderModalData: null,
        orderByNumber: null,
        isOrderByNumberLoading: false,
        orderByNumberError: null,
        newOrderData: null,
        isNewOrderLoading: false,
        newOrderError: null
      },
      orders: {
        orders: [],
        error: null,
        isLoading: false
      },
      feed: {
        orders: null,
        total: 0,
        totalToday: 0,
        error: null,
        isLoading: true
      },
      user: {
        data: null,
        isAuthChecked: false
      }
    });
  });
});
