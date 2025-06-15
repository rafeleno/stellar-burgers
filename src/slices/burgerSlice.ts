import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { randomUUID } from 'crypto';

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
    // addIngredient: (state, action: { payload: TConstructorIngredient }) => {
    //   action.payload.type === 'bun'
    //     ? (state.constructorItems.bun = action.payload)
    //     : state.constructorItems.ingredients.push(action.payload);
    // },

    addIngredient: {
      reducer: (
        state,
        { payload }: PayloadAction<TConstructorIngredient & { id: string }>
      ) => {
        if (payload.type === 'bun') {
          state.constructorItems.bun = payload;
        } else {
          state.constructorItems.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: crypto.randomUUID() }
      })
    },
    removeIngredient: (state, { payload }: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient: TConstructorIngredient) => {
            return ingredient.id !== payload;
          }
        );
    },
    clearBurger: (state) => {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    }
  }
});

export const { addIngredient, removeIngredient, clearBurger } =
  burgerSlice.actions;
export default burgerSlice.reducer;
