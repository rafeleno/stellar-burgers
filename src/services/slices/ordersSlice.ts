import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TInitialState = {
  orders: TOrder[] | null;
  error: string | null;
  isLoading: boolean;
};

const initialState: TInitialState = {
  orders: [],
  error: null,
  isLoading: false
};

export const getOrdersApiThunk = createAsyncThunk<TOrder[]>(
  'orders/getOrders',
  getOrdersApi
);

export const ordersSlice: Slice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersApiThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrdersApiThunk.rejected, (state) => {
        state.error = 'Ошибка';
        state.isLoading = false;
      })
      .addCase(getOrdersApiThunk.pending, (state) => {
        state.isLoading = true;
      });
  }
});

export default ordersSlice.reducer;
