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
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { getUser } from '../../services/slices/userSlice';
import { getIngredients } from '../../services/slices/ingredientSlice';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
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
            <ProtectedRoute>
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
        <Route path={'/feed/:orderNumber'} element={<OrderInfo />} />
        <Route path={'/ingredients/:id'} element={<IngredientDetails />} />
        <Route
          path={'/profile/orders/:orderNumber'}
          element={
            <ProtectedRoute onlyForAuth>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path={'*'} element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={'Описание ингредиента'}
                onClose={() => {
                  dispatch(() => navigate(-1));
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:orderNumber'
            element={
              <ProtectedRoute onlyForAuth>
                <Modal
                  title={'Заказ'}
                  onClose={() => {
                    dispatch(() => navigate(-1));
                  }}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
          <Route
            path='/feed/:orderNumber'
            element={
              <Modal
                title={'Заказ'}
                onClose={() => {
                  dispatch(() => navigate(-1));
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
