import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/store';
import { fetchOrder } from '../../slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const orderSelector = useSelector((state: any) => state.order);
  const { orderRequest, orderModalData } = orderSelector;
  const burgerSelector = useSelector((state: any) => state.burger);
  const { constructorItems } = burgerSelector;
  const dispatch = useDispatch();

  //TODO: DONE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    dispatch(fetchOrder(constructorItems));
    console.log(orderModalData);
  };
  const closeOrderModal = () => {};

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
