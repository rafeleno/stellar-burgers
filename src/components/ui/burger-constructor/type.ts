import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { TBurgerConstructorItems } from 'src/components/burger-constructor-element/type';

export type BurgerConstructorUIProps = {
  constructorItems: TBurgerConstructorItems;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
