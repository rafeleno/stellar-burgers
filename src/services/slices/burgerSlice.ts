import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { randomUUID } from 'crypto';
import { fetchOrder } from './orderSlice';
import { TBurgerConstructorItems } from 'src/components/burger-constructor-element/type';

type TInitialState = {
  constructorItems: TBurgerConstructorItems;
  error: string | null;
};

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
    moveUpIngredient: (state, { payload }: PayloadAction<string>) => {
      const index = state.constructorItems.ingredients.findIndex(
        (ingredient) => ingredient.id === payload
      );
      if (index > 0) {
        const [movedIngredient] = state.constructorItems.ingredients.splice(
          index,
          1
        );
        state.constructorItems.ingredients.splice(
          index - 1,
          0,
          movedIngredient
        );
      }
    },
    moveDownIngredient: (state, { payload }: PayloadAction<string>) => {
      const index = state.constructorItems.ingredients.findIndex(
        (ingredient) => ingredient.id === payload
      );
      if (index < state.constructorItems.ingredients.length - 1) {
        const [movedIngredient] = state.constructorItems.ingredients.splice(
          index,
          1
        );
        state.constructorItems.ingredients.splice(
          index + 1,
          0,
          movedIngredient
        );
      }
    },
    removeIngredient: (state, { payload }: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient: TConstructorIngredient) => ingredient.id !== payload
        );
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.fulfilled, (state) => {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    });
  }
});

export const {
  addIngredient,
  removeIngredient,
  clearBurger,
  moveUpIngredient,
  moveDownIngredient
} = burgerSlice.actions;
export default burgerSlice.reducer;
