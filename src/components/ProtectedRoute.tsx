import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../services/store';
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
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
