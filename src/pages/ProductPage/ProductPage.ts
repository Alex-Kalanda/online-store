import './ProductPage.style.scss';
import { IProduct } from '../../database/DataBase.interfaces';
import Database from '../../database/Database';
import PathProduct from '../../components/PathProduct/PathProduct';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import getMainBlock from '../../utils/getMainBlock';

class ProductPage {
  static render(param: string) {
    const main = getMainBlock();

    if (!Database.getProductByParameters(param)) {
      main.innerHTML = `
        <div class="produсt-error">
          Product ${param} not found.
        </div>
      `;
    } else {
      const product = Database.getProductByParameters(param) as IProduct;
      const pathProduct = new PathProduct(product).render();
      const productDetails = new ProductDetails(product).render();
      main.innerHTML = `
        <section class="path">
          ${pathProduct}
        </section>
        <section class="product-details">
          ${productDetails}
        </section>
      `;
    }
  }
}

export default ProductPage;
