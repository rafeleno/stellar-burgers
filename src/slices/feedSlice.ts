import { createSlice, Slice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

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
  reducers: {}
});

export default feedSlice.reducer;
