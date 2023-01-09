import './Header.style.scss';
import headerLogo from '../../../assets/img/logo.png';
import headerBasket from '../../../assets/svg/header-basket.svg';
import { Title, Symbol } from '../../../common.types/enums';
import Basket from '../../../utils/Basket';

class Header {
  private previousAmount: number = new Basket().getBasketAmount();

  private previousSum: number = new Basket().getBasketSum();

  constructor() {
    this.startWatcher();
  }

  private startWatcher(): void {
    setInterval(() => {
      const [headerAmount] = document.getElementsByName('basket-amount');
      const [headerSum] = document.getElementsByName('basket-sum');
      const basket = new Basket();
      const amount = basket.getBasketAmount();
      const sum = basket.getBasketSum();
      headerAmount.innerText = `${amount}`;
      headerSum.innerText = `${Symbol.CURRENCY}${sum}`;
    }, 100);
  }

  public render(): string {
    return `
          <header class="header">
            <a href="/" class="header__logo">
                <img src=${headerLogo} alt="shop logo">
            </a>
            <div class="header__money show">
                <span class="header__money__text">${Title.HEADER_TOTAL_MONEY}</span>
                <span 
                  id="headerTotalMoney" 
                  class="header__money__value" 
                  name="basket-sum"
                >
                  ${Symbol.CURRENCY}${this.previousSum}
                </span>
            </div>
            <div onclick="window.location.href = '/basket'" class="header__basket">
                <img src=${headerBasket} alt="basket icon">
                <div 
                  id="headerBasketAmount" 
                  class="header__basket__amount show" 
                  name="basket-amount"
                >
                  ${this.previousAmount}
                </div>
            </div>
          </header>
          `;
  }
}

export default Header;
