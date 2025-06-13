import { createSlice, Slice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type TInitialState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  error: string | null;
};

//TODO: DONE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const initialState: TInitialState = {
  error: null,
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

export const burgerSlice: Slice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: (state, action: { payload: TConstructorIngredient }) => {
      action.payload.type === 'bun'
        ? (state.constructorItems.bun = action.payload)
        : state.constructorItems.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: { payload: string }) => {
      if (state.constructorItems.bun?.id === action.payload) {
        state.constructorItems.bun = null;
      } else {
        state.constructorItems.ingredients =
          state.constructorItems.ingredients.filter(
            (ingredient: TConstructorIngredient) =>
              ingredient.id !== action.payload
          );
      }
    }
  }
});

export default burgerSlice.reducer;
