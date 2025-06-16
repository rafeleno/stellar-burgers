import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrdersApiThunk } from '../../services/slices/ordersSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const userOrders: TOrder[] = useSelector((state) => state.orders.data);
  const isLoading = useSelector((state) => state.orders.isLoading);
  const [orders, setOrders] = useState<TOrder[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersApiThunk());
  }, [dispatch]);

  useEffect(() => {
    setOrders(userOrders);
  }, [userOrders]);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
