import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie } from '../../utils/cookie';

export const userRegister = createAsyncThunk<TAuthResponse, TRegisterData>(
  'user/register',
  async (userData: TRegisterData) => {
    const response = await registerUserApi(userData);
    return response;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData: TLoginData) => {
    const response = await loginUserApi(userData);
    return response;
  }
);

export const logoutUser = createAsyncThunk('user/logout', logoutApi);

export const changeUserInfo = createAsyncThunk(
  'user/changeInfo',
  async (user: Partial<TRegisterData>) => {
    const response = await updateUserApi(user);
    return response;
  }
);

export const getUser = createAsyncThunk('user/get', getUserApi);

type TInitialState = {
  data: TUser | null;
  isAuthChecked: boolean;
};

const initialState: TInitialState = {
  data: null,
  isAuthChecked: false
};

export const userSlice: Slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.fulfilled, (state, action) => {
        state.data = action.payload.user;

        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(userRegister.rejected, (state) => {
        state.data = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.data = null;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.user;

        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(logoutUser.rejected, (state) => {
        state.data = null;

        setCookie('accessToken', '');
        localStorage.removeItem('refreshToken');
      })
      .addCase(changeUserInfo.fulfilled, (state, action) => {
        state.data = action.payload.user;
      });
  }
});

export default userSlice.reducer;
