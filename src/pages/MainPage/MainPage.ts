import './MainPage.style.scss';
import WelcomeBlock from '../../components/WelcomeBlock/WelcomeBlock';
import Sidebar from '../../components/containers/Sidebar/Sidebar';
import Controls from '../../components/Controls/Controls';
import ProductsGrid from '../../components/ProductsGrid/ProductsGrid';
import UrlFormatter from '../../utils/UrlFormatter';
import Database from '../../database/Database';
import { IProcessedData, IProduct } from '../../database/DataBase.interfaces';
import getMainBlock from '../../utils/getMainBlock';

class MainPage {
  static getData(): IProcessedData {
    return Database.getProcessedData(new UrlFormatter().getAllQueryParams());
  }

  static render() {
    const data = MainPage.getData();
    const products: IProduct[] = [...data.productsId].map((id: number) => Database.getProductById(id));
    const rangePricePoses: [number, number] = [
      Math.min(...products.map((p: IProduct): number => p.price)),
      Math.max(...products.map((p: IProduct): number => p.price)),
    ];
    const rangeStockPoses: [number, number] = [
      Math.min(...products.map((p: IProduct): number => p.stock)),
      Math.max(...products.map((p: IProduct): number => p.stock)),
    ];

    data.price = rangePricePoses;
    data.stock = rangeStockPoses;

    const welcomeBlock = new WelcomeBlock().render();
    const sideBar = new Sidebar(MainPage.reRender).render(data);
    const controls = new Controls(MainPage.reRender).render(data);
    const grid = new ProductsGrid(data).render();
    const main = getMainBlock();

    main.innerHTML = `
      ${welcomeBlock}
      <section class="goods">
        ${sideBar}
        <div class="controls-grid" id="products-main">
          ${controls}
          ${grid}
        </div>
      </section>
    `;
  }

  static reRender() {
    MainPage.render();
  }
}

export default MainPage;
