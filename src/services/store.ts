import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientSlice } from './slices/ingredientSlice';
import { ordersSlice } from './slices/ordersSlice';
import { orderSlice } from './slices/orderSlice';
import { burgerSlice } from './slices/burgerSlice';
import { feedSlice } from './slices/feedSlice';
import { userSlice } from './slices/userSlice';

export const rootReducer = combineSlices(
  ingredientSlice,
  burgerSlice,
  orderSlice,
  ordersSlice,
  feedSlice,
  userSlice
);

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
