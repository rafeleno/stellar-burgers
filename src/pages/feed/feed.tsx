import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeed } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const ordersData = useSelector((state) => state.feed.orders);
  const [orders, setOrders] = useState([]);
  console.log(100);

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);
  useEffect(() => {
    setOrders(ordersData);
  }, [ordersData]);

  if (!orders || orders.length === 0) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeed())} />;
};
