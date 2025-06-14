import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { getUser } from '../../slices/userSlice';
import { getFeed } from '../../slices/feedSlice';
import { getIngredients } from '../../slices/ingredientSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getFeed());
    dispatch(getIngredients());
  }, []);

  // Механический разлогин
  // useEffect(() => {
  //   localStorage.removeItem('refreshToken');
  //   setCookie('accessToken', '');
  // }, []);

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path={'/'} element={<ConstructorPage />} />
          <Route path={'/feed'} element={<Feed />} />
          <Route
            path={'/login'}
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path={'/register'}
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path={'/forgot-password'}
            element={
              <ProtectedRoute>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path={'/reset-password'}
            element={
              <ProtectedRoute onlyForAuth>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path={'/profile'}
            element={
              <ProtectedRoute onlyForAuth>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path={'/profile/orders'}
            element={
              <ProtectedRoute onlyForAuth>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route path={'*'} element={<NotFound404 />} />
          <Route
            path={'/feed/:number'}
            element={
              <Modal title='OrderInfo' onClose={() => null}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path={'/ingredients/:id'}
            element={
              <Modal title='IngredientsDetails' onClose={() => null}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={'/profile/orders/:number'}
            element={
              <ProtectedRoute>
                <Modal title='OrderInfo' onClose={() => null}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
