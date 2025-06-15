import { Navigate } from 'react-router-dom';
import { useSelector } from '../services/store';

type ProtectedRouteProps = {
  onlyForAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  children,
  onlyForAuth
}: ProtectedRouteProps) => {
  const user = useSelector((state) => state.user.data);
  const isAuthChecked = user;

  if (onlyForAuth && !isAuthChecked) {
    //  если маршрут для авторизованного пользователя, но пользователь неавторизован, то делаем редирект
    return <Navigate replace to='/login' />;
  }

  if (!onlyForAuth && isAuthChecked) {
    //  если маршрут для неавторизованного пользователя, но пользователь авторизован
    return <Navigate replace to='/' />;
  }

  return children;
};
