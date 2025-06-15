import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';

export const OrderInfo: FC = () => {
  const ingredients = useSelector((state) => state.ingredients.data);
  const orders = useSelector((state) => state.feed.orders);

  const { orderNumber } = useParams<{ orderNumber: string }>();
  const orderData = orders?.find(
    (order: TOrder) => order.number.toString() === orderNumber
  );

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item: string) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing: TIngredient) => {
            console.log('ингредиент:');
            console.log(ing);

            return ing._id === item;
          });

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

    console.log(ingredientsInfo);

    const total = Object.values(ingredientsInfo).reduce(
      (acc: any, item: any) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
