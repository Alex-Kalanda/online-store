import './PathProduct.style.scss';
import { IProduct } from '../../database/DataBase.interfaces';
import formatToPascalCase from '../../utils/formatToPascalCase';

const HOME_LINK = 'shop';

class PathProduct {
  constructor(private product: IProduct) {
    this.product = product;
  }

  render(): string {
    return `
      <div class="path-product">
        <a href="/" class="home-link">${formatToPascalCase(HOME_LINK)}</a>
        /
        ${formatToPascalCase(this.product.category)}
        /
        ${formatToPascalCase(this.product.brand)}
        /
        ${formatToPascalCase(this.product.title)}
      </div>
    `;
  }
}

export default PathProduct;
