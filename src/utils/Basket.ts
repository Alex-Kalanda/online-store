import Database from '../database/Database';
import { IBasketProduct } from '../components/BasketProduct/BasketProduct.interface';
import getPriceAfterDiscont from './getPriceAfterDiscont';
import { LSKeys } from '../common.types/enums';

interface IBasketItem {
  id: number;
  amount: number;
}

class Basket {
  private basket: IBasketItem[];

  constructor() {
    this.basketDefault();
    this.basket = JSON.parse(localStorage.getItem(LSKeys.basket) as string);
  }

  public getBasketList(): IBasketProduct[] {
    return this.basket.map((item: IBasketItem, idx: number): IBasketProduct => ({ ...Database.getProductById(item.id), index: idx + 1, amount: item.amount }));
  }

  private basketDefault(): void {
    if (!localStorage.getItem(LSKeys.basket)) {
      localStorage.setItem(LSKeys.basket, JSON.stringify([]));
    }
  }

  public basketContain(id: number): boolean {
    return !!this.basket.find((item) => item.id === id);
  }

  public getBasketSum(): number {
    const basketSum = this.basket.reduce((acc, item) => acc + this.getPriceById(item.id) * item.amount, 0);
    return +basketSum.toFixed(2);
  }

  private getPriceById(id: number): number {
    return getPriceAfterDiscont(Database.getProductById(id).price, Database.getProductById(id).discountPercentage);
  }

  public getBasketAmount(): number {
    return this.basket.reduce((acc, item) => acc + item.amount, 0);
  }

  public getAmountProduct(id: number): number {
    const element = this.basket.find((elem) => elem.id === id) as IBasketItem;
    return element.amount;
  }

  public increaseAmount(id: number): void {
    this.basket = this.basket.map((element: IBasketItem) => ({
      ...element,
      amount: element.id === id ? element.amount + 1 : element.amount,
    }));
    localStorage.basketHS = JSON.stringify(this.basket);
  }

  public decreaseAmount(id: number): void {
    this.basket = this.basket.map((element: IBasketItem) => ({
      ...element,
      amount: element.id === id ? element.amount - 1 : element.amount,
    }));
    localStorage.basketHS = JSON.stringify(this.basket);
  }

  public setProductToBasket(id: number): void {
    this.basket.push({
      id,
      amount: 1,
    });
    localStorage.basketHS = JSON.stringify(this.basket);
  }

  public removeProductFromBasket(id: number): void {
    this.basket = this.basket.filter((item) => item.id !== id);
    localStorage.basketHS = JSON.stringify(this.basket);
  }

  public clear():void {
    localStorage.removeItem(LSKeys.basket);
  }
}

export default Basket;
