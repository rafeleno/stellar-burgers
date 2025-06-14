import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

type TInitialState = {
  data: TIngredient[];
  isLoading: boolean;
  error: null | 'Ошибка';
};

const initialState: TInitialState = {
  data: [],
  isLoading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

export const ingredientSlice: Slice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.error = 'Ошибка';
        state.isLoading = false;
      })
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      });
  }
});
