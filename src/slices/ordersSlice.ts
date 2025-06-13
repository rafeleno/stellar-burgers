import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TInitialState = {
  data: TOrder[] | null;
  error: string | null;
  isLoading: boolean;
};

//TODO: DONE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const initialState: TInitialState = {
  data: [],
  error: null,
  isLoading: false
};

const getOrdersApiThunk = createAsyncThunk<TOrder[]>(
  'orders/getOrders',
  async () => {
    const response = await getOrdersApi();
    return response;
  }
);

export const ordersSlice: Slice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersApiThunk.fulfilled, (state, action) => {
        state.data = action.payload;
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
