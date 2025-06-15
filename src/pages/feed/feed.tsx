import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeed } from '../../services/slices/feedSlice';
import { getIngredients } from '../../services/slices/ingredientSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    setOrders(feed.orders);
    //костыль?
    dispatch(getIngredients());
  }, [feed.orders]);

  if (!orders || orders.length === 0) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeed())} />;
};
