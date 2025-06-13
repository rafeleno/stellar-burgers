import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

type TInitialState = {
  data: TIngredient[] | null;
  isLoading: boolean;
  error: null | 'Ошибка';
};

const initialState: TInitialState = {
  data: null,
  isLoading: false,
  error: null
};

export const getIngredientsApiThunk = createAsyncThunk(
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
      .addCase(getIngredientsApiThunk.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;

        console.log('getIngredientsApiThunk.fulfilled');
      })
      .addCase(getIngredientsApiThunk.rejected, (state) => {
        state.error = 'Ошибка';
        state.isLoading = false;

        console.log('getIngredientsApiThunk.rejected');
      })
      .addCase(getIngredientsApiThunk.pending, (state) => {
        state.isLoading = true;

        console.log('getIngredientsApiThunk.pending');
      });
  }
});
