import './BasketProduct.style.scss';
import getPriceAfterDiscont from '../../utils/getPriceAfterDiscont';
import removeIcon from '../../assets/svg/delete_button.svg';
import { IBasketProduct } from './BasketProduct.interface';
import { Title, Symbol } from '../../common.types/enums';

class BasketProduct {
  constructor(private product: IBasketProduct) {
    this.product = product;
  }

  render(): string {
    const {
      index, amount, title, brand, stock, discountPercentage, price, thumbnail, category, description, id,
    } = this.product;
    const actualPrice = getPriceAfterDiscont(price, discountPercentage);
    const totalOldPrice = (price * amount).toFixed(2);
    const totalActualPrice = (actualPrice * amount).toFixed(2);

    return `
      <td>
        <span class="basket-product__index">${index}</span>
      </td>
      <td class="basket-product__info" onclick="window.location.href = '/product/${id}'">
        <div class="basket-product__container">
          <div class="basket-product__image">
            <img src=${thumbnail} alt="product image">
          </div>
          <div class="basket-product__desc">
            <span class="basket-product__desc__title">${title}</span>
            <div class="basket-product__desc__brand">
              <span class="basket-product__desc__brand__title">${Title.CATEGORY}</span>
              <span class="basket-product__desc__brand__value">${category}</span>
            </div>
            <div class="basket-product__desc__brand">
              <span class="basket-product__desc__brand__title">${Title.BRAND}</span>
              <span class="basket-product__desc__brand__value">${brand}</span>
            </div>
            <div class="basket-product__desc__stock">
              <span class="basket-product__desc__title">${Title.STOCK}</span>
              <span class="basket-product__desc__value">${stock}</span>
            </div>
            <div class="basket-product__desc__discount">
              <span class="basket-product__desc__title">${Title.DISCOUNT}</span>
              <span class="basket-product__desc__value">${discountPercentage}${Symbol.DISCOUNT}</span>
            </div>
          </div>
        </div>
        <div class="basket-product__descriotion">
          <span class="basket-product__descriotion__value">${description}</span>
        </div>
      </td>
      <td>
        <div class="basket-product__prices">
          <span class="basket-product__prices__old">${Symbol.CURRENCY}${price}</span>
          <span class="basket-product__prices__actual">${Symbol.CURRENCY}${actualPrice}</span>
        </div>
      </td>
      <td class="">
        <div class="basket-product__quantity">
          <div class="basket-product__quantity__minus">${Symbol.MINUS}</div>
          <span class="basket-product__quantity__value">${amount}</span>
          <div class="basket-product__quantity__plus">${Symbol.PLUS}</div>
        </div>
      </td>
      <td class="">
        <div class="basket-product__total">
          <span class="basket-product__total__old">${Symbol.CURRENCY}${totalOldPrice}</span>
          <span class="basket-product__total__actual">${Symbol.CURRENCY}${totalActualPrice}</span>
        </div>
      </td>
      <td class="">
        <img class="basket-product__remove" src=${removeIcon} alt="remove product">
      </td>`;
  }
}

export default BasketProduct;
