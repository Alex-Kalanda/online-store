import './ProductsGrid.style.scss';
import Product from '../Product/Product';
import { IProcessedData, IProduct } from '../../database/DataBase.interfaces';
import Database from '../../database/Database';
import sort from '../../utils/sort';
import { DEFAULT_MODE } from './ProductsGrid.const';
import changeStatusButton from '../../utils/changeStatusButton';
import { findElem } from '../../utils/findElem';

const NO_PRODUCT_TEXT = 'No products found 😏';

class ProductsGrid {
  private readonly productsDataList: IProduct[];

  constructor(private data: IProcessedData) {
    this.data = data;
    this.productsDataList = [...this.data.productsId].map((id: number) => Database.getProductById(id));
  }

  private addListeners(): void {
    setTimeout(() => {
      const allProducts = findElem('.grid');
      allProducts.addEventListener('click', (event) => {
        const element = event.target as HTMLElement;
        if (element.classList.contains('product-item__buttons_white')) {
          const productContainer = element.closest('.product-item') as HTMLElement;
          const id = Number(productContainer.id);
          changeStatusButton(element, id);
        }
      });
    });
  }

  render(): string {
    const sortedDataList = this.getSortedList(this.data.sort);
    const productsList = sortedDataList.reduce((acc: string, data: IProduct) => acc + new Product(data).render(), '');
    const notFound = `<span class="grid__empty">${NO_PRODUCT_TEXT}</span>`;

    return `<div class="grid ${this.data.mode || DEFAULT_MODE}">${sortedDataList.length ? productsList : notFound}</div>`;
  }

  getSortedList(sortingType: string): IProduct[] {
    this.addListeners();
    return sort(this.productsDataList, sortingType);
  }
}

export default ProductsGrid;
