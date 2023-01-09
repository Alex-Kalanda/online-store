import { IProduct } from '../../database/DataBase.interfaces';

export interface IBasketProduct extends IProduct {
  index: number;
  amount: number;
}
