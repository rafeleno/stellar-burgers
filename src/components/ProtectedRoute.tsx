import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../services/store';
import { useEffect, useState } from 'react';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyForAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  children,
  onlyForAuth
}: ProtectedRouteProps) => {
  const data = useSelector((state) => state.user);
  const isAuthChecked = data.isAuthChecked;
  const user = data.data;
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyForAuth && isAuthChecked && !user) {
    console.log('User is not authenticated, redirecting to login');
    //  если маршрут для авторизованного пользователя, но пользователь неавторизован, то делаем редирект
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyForAuth && isAuthChecked && user) {
    return children;
  }

  if (!onlyForAuth && isAuthChecked && user) {
    //  если маршрут для неавторизованного пользователя, но пользователь авторизован
    return <Navigate to='/' state={{ from: location }} />;
  }

  return children;
};
