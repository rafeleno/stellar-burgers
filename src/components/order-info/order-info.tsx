import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getOrdersApiThunk } from '../../services/slices/ordersSlice';
import { getFeed } from '../../services/slices/feedSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const feedOrders = useSelector((state) => state.feed.orders) || [];
  const userOrders = useSelector((state) => state.orders.orders) || [];
  const ingredients = useSelector((state) => state.ingredients.data) || [];

  useEffect(() => {
    if (feedOrders.length === 0) dispatch(getFeed());
    if (userOrders.length === 0) dispatch(getOrdersApiThunk());
  }, [dispatch, feedOrders.length, userOrders.length]);

  const orders = useMemo(
    () => [...feedOrders, ...userOrders],
    [feedOrders, userOrders]
  );

  const { orderNumber } = useParams<{ orderNumber: string }>();

  const orderData = useMemo(
    () => orders.find((order) => order.number.toString() === orderNumber),
    [orders, orderNumber]
  );

  const orderInfo = useMemo(() => {
    if (!orderData || ingredients.length === 0) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item: string) => {
        if (!acc[item]) {
          const ingredient = ingredients.find(
            (ing: TIngredient) => ing._id === item
          );

          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc: number, item: any) => acc + item.price * item.count,
      0
    );

    return { ...orderData, ingredientsInfo, total, date };
  }, [orderData, ingredients]);

  if (!orderInfo) return <Preloader />;

  return <OrderInfoUI orderInfo={orderInfo} />;
};
