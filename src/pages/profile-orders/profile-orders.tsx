import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useState } from 'react';
import { useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const userOrders: TOrder[] = useSelector((state) => state.orders.data);
  const [orders, setOrders] = useState<TOrder[]>([]);
  useEffect(() => {
    setOrders(userOrders);
  }, [userOrders]);

  return <ProfileOrdersUI orders={orders} />;
};
