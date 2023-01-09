import './BasketGoods.style.scss';
import BasketProduct from '../BasketProduct/BasketProduct';
import { IBasketProduct } from '../BasketProduct/BasketProduct.interface';
import { findElem } from '../../utils/findElem';
import Basket from '../../utils/Basket';
import Database from '../../database/Database';
import { DefaultValues, Symbol } from '../../common.types/enums';
import getPriceAfterDiscont from '../../utils/getPriceAfterDiscont';
import BasketCalc from '../BasketCalc/BasketCalc';
import QueryParamsBasket from '../../utils/QueryParamsBasket';

enum Classes {
  PLUS_BUTTON = 'basket-product__quantity__plus',
  MINUS_BUTTON = 'basket-product__quantity__minus',
  REMOVE_BUTTON = 'basket-product__remove',
}

class BasketGoods {
  private basket = new Basket();

  constructor(private goodsList: IBasketProduct[], private cb: () => void) {
    this.cb = cb;
    this.goodsList = goodsList;
  }

  private addListeners(): void {
    setTimeout(() => {
      const basketCalc = new BasketCalc();
      const basketCoods = findElem('.basket-goods');
      basketCoods.addEventListener('click', (event) => {
        const element = event.target as HTMLElement;

        switch (element.className) {
          case Classes.PLUS_BUTTON:
            this.increaseAmountProduct(element);
            basketCalc.updateTotalBlock();
            break;
          case Classes.MINUS_BUTTON:
            this.decreaseAmountProduct(element);
            basketCalc.updateTotalBlock();
            break;
          case Classes.REMOVE_BUTTON:
            this.removeProduct(element);
            basketCalc.updateTotalBlock();
            break;
          default:
            break;
        }
      });
    });
  }

  private increaseAmountProduct(element: HTMLElement) {
    const productContainer = element.closest('.basket-product') as HTMLElement;
    const id = Number(productContainer.id);
    const countElement = findElem('.basket-product__quantity__value', productContainer);
    const count = Number(countElement.innerText);
    const { stock } = Database.getProductById(id);
    if (count < stock) {
      countElement.innerText = `${count + 1}`;
      this.basket.increaseAmount(id);
      this.recalculationSum(productContainer, id);
    }
  }

  private decreaseAmountProduct(element: HTMLElement) {
    const productContainer = element.closest('.basket-product') as HTMLElement;
    const id = Number(productContainer.id);
    const countElement = findElem('.basket-product__quantity__value', productContainer);
    const count = Number(countElement.innerText);
    if (count > 1) {
      countElement.innerText = `${count - 1}`;
      this.basket.decreaseAmount(id);
      this.recalculationSum(productContainer, id);
    } else {
      this.removeProduct(element);
    }
  }

  private recalculationSum(productContainer: HTMLElement, id: number) {
    const product = Database.getProductById(id);
    const amount = this.basket.getAmountProduct(id);
    const totalOldPrice = findElem('.basket-product__total__old', productContainer);
    totalOldPrice.innerText = `${Symbol.CURRENCY}${(product.price * amount).toFixed(2)}`;
    const actualPrice = getPriceAfterDiscont(product.price, product.discountPercentage);
    const totalActualPrice = findElem('.basket-product__total__actual', productContainer);
    totalActualPrice.innerText = `${Symbol.CURRENCY}${(actualPrice * amount).toFixed(2)}`;
  }

  private removeProduct(element: HTMLElement): void {
    const productContainer = element.closest('.basket-product') as HTMLElement;
    const id = Number(productContainer.id);
    this.basket.removeProductFromBasket(id);
    this.cb();
  }

  render(): string {
    this.addListeners();
    return `
      <table class="basket-goods">
        <thead>
          <tr>
            ${this.getTableCaptions()}
          </tr>
        </thead>
        <tbody>
          ${this.getListOfGoods()}
        </tbody>
      </table>`;
  }

  getTableCaptions(): string {
    return `
      <th class="basket-goods__index"></th>
      <th class="basket-goods__product">Products</th>
      <th class="basket-goods__prices">Price</th>
      <th class="basket-goods__quantity">Quantity</th>
      <th class="basket-goods__total">Total</th>
      <th class="basket-goods__remove"></th>`;
  }

  getListOnPage(start: number, end: number): IBasketProduct[] {
    return this.goodsList.slice(start, end);
  }

  getListOfGoods(): string {
    const queryParam = new QueryParamsBasket();
    const productOnPage = Number(queryParam.getParam('limit')) || DefaultValues.PAGINATION_LIMIT;
    const valuePage = Number(queryParam.getParam('page')) || DefaultValues.PAGINATION_PAGE;
    const start = (valuePage - 1) * productOnPage;
    const end = start + productOnPage;
    return this.getListOnPage(start, end).reduce((acc: string, prod: IBasketProduct): string => (
      `
      ${acc}
      <tr id="${prod.id}" class="basket-product">
        ${new BasketProduct(prod).render()}
      </tr>
      `
    ), '');
  }
}

export default BasketGoods;
