import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeed = createAsyncThunk('orders/getFeed', async () => {
  const response = await getFeedsApi();
  return response;
});

type TInitialState = {
  orders: TOrder[] | null;
  total: number;
  totalToday: number;
  error: 'Ошибка' | null;
  isLoading: boolean;
};

const initialState: TInitialState = {
  orders: null,
  total: 0,
  totalToday: 0,
  error: null,
  isLoading: true
};

export const feedSlice: Slice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.orders = null;
        state.total = 0;
        state.totalToday = 0;
        state.isLoading = false;
      })
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
      });
  }
});

export default feedSlice.reducer;
