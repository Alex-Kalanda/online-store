import './ProductPhotosSlider.style.scss';
import { IProduct } from '../../database/DataBase.interfaces';
import KeysProduct from '../../database/DataBase.enums';

class ProductPhotosSlider {
  constructor(private images: IProduct[KeysProduct.PHOTOS_LINKS]) {
    this.images = images;
  }

  render(): string {
    const productsImages = this.images.reduce((acc: string, link: string) => {
      const image = `
        <div class="slider__item">
          <img src="${link}" alt="product photo">
        </div>
      `;
      return acc + image;
    }, '');

    return `<div class="product-details__photos__slider">${productsImages}</div>`;
  }
}

export default ProductPhotosSlider;
