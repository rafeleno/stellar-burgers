// import { Preloader } from '@ui';
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  // onlyUnAuth,
  children
}: ProtectedRouteProps) => children;

// const isAuthChecked = useSelector(isAuthCheckedSelector); //  isAuthCheckedSelector — селектор получения состояния загрузки пользователя
// const user = useSelector(userDataSelector); //  userDataSelector — селектор получения пользователя из store

// if (!isAuthChecked) {
//   // пока идёт чекаут пользователя , показываем прелоадер
//   return <Preloader />;
// }

// if (!onlyUnAuth && !user) {
//   //  если маршрут для авторизованного пользователя, но пользователь неавторизован, то делаем редирект
//   return <Navigate replace to='/login' />;
// }

// if (onlyUnAuth && user) {
//   //  если маршрут для неавторизованного пользователя, но пользователь авторизован
//   return <Navigate replace to='/list' />;
// }
