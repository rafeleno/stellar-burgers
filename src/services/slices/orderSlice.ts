import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';

export const fetchOrder = createAsyncThunk<TOrder, TIngredient[]>(
  'order/fetchOrder',
  async (ingredients: TIngredient[]) => {
    try {
      if (!ingredients || ingredients.length === 0) {
        return Promise.reject('Нет ингредиентов для заказа');
      }
      if (ingredients.filter((item) => item.type === 'bun').length !== 2) {
        return Promise.reject('неверное количество булок');
      }
      const ingredientsForFetch = ingredients.map((item) => item._id);
      const response = await orderBurgerApi(ingredientsForFetch);
      return response.order;
    } catch (error) {
      return Promise.reject('Не удалось получить заказ');
    }
  }
);

export type TInitialState = {
  orderRequest: boolean | 'loading';
  orderModalData: TOrder | null;
  orderByNumber: TOrder | null;
  isOrderByNumberLoading: boolean;
  orderByNumberError: null | 'Ошибка загрузки заказа по номеру';
  newOrderData: TOrder | null;
  isNewOrderLoading: boolean;
  newOrderError: null | 'Ошибка загрузки нового заказа';
};

const initialState: TInitialState = {
  orderRequest: false,
  orderModalData: null,
  orderByNumber: null,
  isOrderByNumberLoading: false,
  orderByNumberError: null,
  newOrderData: null,
  isNewOrderLoading: false,
  newOrderError: null
};

export const orderSlice: Slice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderRequest = false;
      state.orderModalData = null;
      state.newOrderData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.fulfilled, (state, action: { payload: TOrder }) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
        state.isNewOrderLoading = false;
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.orderRequest = false;
        state.orderModalData = null;
        state.isNewOrderLoading = false;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.orderRequest = true;
        state.isNewOrderLoading = true;
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
