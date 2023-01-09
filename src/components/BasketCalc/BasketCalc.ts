import './BasketCalc.style.scss';
import { Button, Title, Symbol } from '../../common.types/enums';
import Basket from '../../utils/Basket';
import { findElem } from '../../utils/findElem';
import ModalWindow from '../ModalWindow/ModalWindow';
import Coupons from '../BasketCoupons/Coupons';

class BasketCalc {
  public basket = new Basket();

  private addListeners() {
    setTimeout(() => {
      const buttonOrdering = findElem('.total-card__calc__ordering');
      buttonOrdering.addEventListener('click', () => {
        new ModalWindow().render();
      });
    });
  }

  public updateTotalBlock(): void {
    const basket = new Basket();
    const totalProductsCount = findElem('.total-card__header__total-products__value');
    totalProductsCount.innerHTML = `${basket.getBasketAmount()}`;
    const subtotalProductsSum = findElem('.total-card__calc__subtotal__value');
    subtotalProductsSum.innerHTML = `${Symbol.CURRENCY}${basket.getBasketSum()}`;
    const subTotalSum = findElem('.total-card__calc__subtotal__value');
    const discontBlock = findElem('.total-card__calc__discount');
    const discontValueBlock = findElem('.total-card__calc__discount__value');
    const totalSumBlock = findElem('.total-card__calc__summary');
    const totalSumValueBlock = findElem('.total-card__calc__summary__value');
    const discont = new Coupons().getActualDiscont();
    if (discont > 0) {
      subTotalSum.classList.add('cross');
      discontBlock.classList.add('show-block');
      totalSumBlock.classList.add('show-block');
      discontValueBlock.innerText = `${discont}${Symbol.DISCOUNT}`;
      const sumAfterDiscont = ((basket.getBasketSum() * (100 - discont)) / 100).toFixed(2);
      totalSumValueBlock.innerText = `${Symbol.CURRENCY}${sumAfterDiscont}`;
    } else {
      subTotalSum.classList.remove('cross');
      discontBlock.classList.remove('show-block');
      discontValueBlock.innerText = `0${Symbol.DISCOUNT}`;
      totalSumBlock.classList.remove('show-block');
      totalSumValueBlock.innerText = `${Symbol.CURRENCY}${basket.getBasketSum()}`;
    }
  }

  public render(): string {
    this.addListeners();

    return `
      <div class="total-card">
        <div class="total-card__header">
          <div class="total-card__header__title">${Title.BASKET_HEADER__TITLE}</div>
          <div class="total-card__header__total-products">
            ${Title.PRODUCTS}
            <span class="total-card__header__total-products__value">${this.basket.getBasketAmount()}</span>
          </div>
        </div>
        <div class="total-card__calc">
          <div class="total-card__calc__subtotal">
            <span class="total-card__calc__subtotal__title">${Title.CARD_SUBTOTAL_MONEY}</span>
            <span class="total-card__calc__subtotal__value">${Symbol.CURRENCY}${this.basket.getBasketSum()}</span>
          </div>
          <div class="total-card__calc__discount">
            <span class="total-card__calc__discount__title">${Title.DISCOUNT}</span>
            <div>
              <span>${Symbol.SUBTRACT}</span>
              <span class="total-card__calc__discount__value"></span>
            </div>
          </div>
          <div class="total-card__calc__summary">
            <span class="total-card__calc__summary__title">${Title.CARD_TOTAL_MONEY}</span>
            <span class="total-card__calc__summary__value"></span>
          </div>
          <button class="total-card__calc__ordering">${Button.ORDERING}</button>
        </div> 
      </div>
    `;
  }
}

export default BasketCalc;
