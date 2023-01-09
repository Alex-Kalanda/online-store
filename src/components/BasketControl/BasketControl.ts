import './BasketControl.style.scss';
import prevBtn from '../../assets/svg/basket-arrow-prev.svg';
import nextBtn from '../../assets/svg/basket-arrow-next.svg';
import QueryParamsBasket from '../../utils/QueryParamsBasket';
import Basket from '../../utils/Basket';
import { findElem } from '../../utils/findElem';
import { DefaultValues } from '../../common.types/enums';

const SUBHEADER_TITLE = 'shopping card'.toUpperCase();
const AMOUNT_BASKET_GOODS_TITLE = 'items:'.toUpperCase();
const AMOUNT_BASKET_PAGES_TITLE = 'page:'.toUpperCase();

class BasketControls {
  private queryParam = new QueryParamsBasket();

  private basket = new Basket();

  constructor(private cb: () => void) {
    this.cb = cb;
  }

  private addListeners(): void {
    setTimeout(() => {
      const limit = findElem('.items-counter__value') as HTMLInputElement;
      const previousPage = findElem('.pages-counter__prev');
      const currentPageElement = findElem('.pages-counter__value');
      const nextPage = findElem('.pages-counter__next');

      const countProductOnPage = this.getCountProductOnPage();
      const maxPage = Math.ceil(this.basket.getBasketList().length / countProductOnPage);
      const currentPageValue = this.getCurrentPage();

      limit.addEventListener('input', () => {
        if (Number(this.queryParam.getParam('page')) > maxPage) {
          const previousValue = Number(this.queryParam.getParam('page'));
          this.queryParam.setParam('page', `${previousValue - 1}`);
        }
        this.queryParam.setParam('limit', `${limit.value}`);
        this.queryParam.sendParams(this.cb);
      });

      previousPage.addEventListener('click', () => {
        if (currentPageValue > DefaultValues.PAGINATION_PAGE) {
          const previousValue = this.queryParam.getParam('page') || DefaultValues.PAGINATION_PAGE;
          currentPageElement.innerText = `${+previousValue - 1}`;
          this.queryParam.setParam('page', `${currentPageElement.innerText}`);
          this.queryParam.sendParams(this.cb);
        }
      });

      nextPage.addEventListener('click', () => {
        if (currentPageValue < maxPage) {
          const previousValue = this.queryParam.getParam('page') || DefaultValues.PAGINATION_PAGE;
          currentPageElement.innerText = `${+previousValue + 1}`;
          this.queryParam.setParam('page', `${currentPageElement.innerText}`);
          this.queryParam.sendParams(this.cb);
        }
      });
    });
  }

  private getMaxValuePage():number {
    const totalAmountProducts = this.basket.getBasketList().length;
    const countProductOnPage = this.getCountProductOnPage();
    return Math.ceil(totalAmountProducts / countProductOnPage);
  }

  private getCountProductOnPage(): number {
    return Number(this.queryParam.getParam('limit')) || DefaultValues.PAGINATION_LIMIT;
  }

  private getCurrentPage(): number {
    const maxValuePage = this.getMaxValuePage();
    const currentPageFromParams = Number(this.queryParam.getParam('page')) || DefaultValues.PAGINATION_PAGE;
    const currentPage = currentPageFromParams > maxValuePage ? maxValuePage : currentPageFromParams;

    if (Number(this.queryParam.getParam('page')) > this.getMaxValuePage()) {
      this.queryParam.setParam('page', `${currentPage}`);
      this.queryParam.sendParams(this.cb);
    }

    return currentPage;
  }

  public render(): string {
    this.addListeners();
    return `
      <div class="basket__subheader ">
        <h2 class="h2 basket__subheader__title">${SUBHEADER_TITLE}</h2>
        <div class="basket__subheader__amount">
          ${this.getBlockAmountItems()}
          ${this.getBlockAmountPages()}
        </div>
      </div>
    `;
  }

  private getBlockAmountItems(): string {
    return `
      <div class="basket__subheader__amount__items items-counter">
        ${AMOUNT_BASKET_GOODS_TITLE}
        <input type="number" min="1" max="${this.basket.getBasketList().length}" class="items-counter__value" value="${this.getCountProductOnPage()}">
      </div>`;
  }

  private getBlockAmountPages(): string {
    return `
      <div class="basket__subheader__amount__pages pages-counter">
        <span class="pages-counter__title">
          ${AMOUNT_BASKET_PAGES_TITLE}
        </span>
        <div class="pages-counter__prev">
          <img src=${prevBtn} alt="previous page button">
        </div>
        <div class="pages-counter__value-box">
          <span class="pages-counter__value">${this.getCurrentPage()}</span>
          <span>/</span>
          <span class="pages-counter__max_value">${this.getMaxValuePage()}</span>
        </div>
        <div class="pages-counter__next">
          <img src=${nextBtn} alt="next page button">
        </div>
      </div>`;
  }
}

export default BasketControls;
