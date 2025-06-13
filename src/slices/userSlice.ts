import { createSlice, Slice } from '@reduxjs/toolkit';

type TInitialState = {
  data: { name: string; email: string } | null;
};

const initialState: TInitialState = {
  data: null
};

export const userSlice: Slice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
});

export default userSlice.reducer;
