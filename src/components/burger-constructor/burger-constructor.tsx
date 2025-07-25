import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useDispatch, useSelector } from '../../services/store';
import { clearOrder, fetchOrder } from '../../services/slices/orderSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const orderSelector = useSelector((state) => state.order);
  const { orderRequest, orderModalData } = orderSelector;
  const { constructorItems } = useSelector((state) => state.burger);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(
      fetchOrder([
        ...constructorItems.ingredients,
        constructorItems.bun,
        constructorItems.bun
      ])
    );
  };
  const closeOrderModal = () => {
    dispatch(clearOrder({}));
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
