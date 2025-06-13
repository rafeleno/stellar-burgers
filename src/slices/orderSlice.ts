import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';

export const fetchOrder = createAsyncThunk<TOrder, TIngredient[]>(
  'order/fetchOrder',
  async (ingredients: TIngredient[]) => {
    try {
      const ingredientsForFetch = ingredients.map((item) => item._id);
      // //
      // console.log(ingredientsForFetch);
      // //
      const response = await orderBurgerApi(ingredientsForFetch);
      // console.log(response.order);
      return response.order;
    } catch (error) {
      return Promise.reject('Не удалось получить заказ');
    }
  }
);

//TODO: DONE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

type TInitialState = {
  orderRequest: boolean | 'loading';
  orderModalData: TOrder | null;
  orderByNumber: TOrder | null;
  isOrderByNumberLoading: boolean;
  orderByNumberError: null | 'Ошибка загрузки заказа по номеру';
  newOrderData: TOrder | null;
  isNewOrderLoading: boolean;
  newOrderError: null | 'Ошибка загрузки нового заказа';
};

const initialState: TInitialState = {
  orderRequest: false,
  orderModalData: null,
  orderByNumber: null,
  isOrderByNumberLoading: false,
  orderByNumberError: null,
  newOrderData: null,
  isNewOrderLoading: false,
  newOrderError: null
};

export const orderSlice: Slice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.fulfilled, (state, action: { payload: TOrder }) => {
        state.orderRequest = true;
        state.orderModalData = action.payload;
        state.isNewOrderLoading = false;

        console.log(100);
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.orderRequest = false;
        state.orderModalData = null;
        state.isNewOrderLoading = false;

        console.log(200);
      })
      .addCase(fetchOrder.pending, (state) => {
        state.isNewOrderLoading = true;

        console.log(300);
      });
  }
});

export default orderSlice.reducer;
