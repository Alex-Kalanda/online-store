import './Product.style.scss';
import { IProduct } from '../../database/DataBase.interfaces';
import star from '../../assets/img/star-icon.png';
import getPriceAfterDiscont from '../../utils/getPriceAfterDiscont';
import { Title, Symbol, Button } from '../../common.types/enums';
import Basket from '../../utils/Basket';

class Product {
  private data: IProduct;

  constructor(data: IProduct) {
    this.data = data;
  }

  render(): string {
    const {
      title, thumbnail, stock, discountPercentage, category, brand, price, rating, id,
    } = this.data;
    const actualPrice = getPriceAfterDiscont(price, discountPercentage);

    return `
        <div class="product-item" id="${id}">
            <div class="product-item__discont">
                <span>${discountPercentage}${Symbol.DISCOUNT}${Title.PRODUCT_DISCOUNT}</span>
            </div>
            <div class="product-item__stock">
                <span>${Title.STOCK}${stock}</span>
            </div>
            <div onclick="window.location.href = '/product/${id}'" class="product-item__image">
                <img src=${thumbnail} alt="product image">
            </div>
            <div class="product-item__title">${title}</div>
            <div class="product-item__category">
                <span class="product-item__category__title">${Title.CATEGORY}</span>
                <span class="product-item__category__text">${category}</span>
            </div>
            <div class="product-item__brand">
                <span class="product-item__brand__title">${Title.BRAND}</span>
                <span class="product-item__brand__text">${brand}</span>
            </div>
            <div class="product-item__rating">
                <div class="product-item__rating__stars">
                    <img src=${star} alt="star of rating">
                    <img src=${star} alt="star of rating">
                    <img src=${star} alt="star of rating">
                    <img src=${star} alt="star of rating">
                    <img src=${star} alt="star of rating">
                    <div class="product-item__rating__indicator" style="width: ${(rating / 5) * 100}%"></div>
                </div>
            </div>
            <div class="product-item__prices">
                <div class="product-item__prices__new">${Symbol.CURRENCY}${actualPrice}</div>
                <div class="product-item__prices__old">${Symbol.CURRENCY}${price}</div>
            </div>
            <div class="product-item__buttons">
                <button onclick="window.location.href = '/product/${id}'" class="product-item__buttons_red">${Button.DETAILS}</button>
                <button class="${new Basket().basketContain(id) ? 'product-item__buttons_white added' : 'product-item__buttons_white'}">${new Basket().basketContain(id) ? Button.REMOVE : Button.ADD}</button>
            </div>
        </div>
        `;
  }
}

export default Product;
