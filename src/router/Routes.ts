import MainPage from '../pages/MainPage/MainPage';
import ProductPage from '../pages/ProductPage/ProductPage';
import BasketPage from '../pages/BasketPage/BasketPage';

export const RoutesWithRequiredParams: string[] = ['/product'];

const Routes = {
  '/': MainPage.render,
  '/basket': BasketPage.render,
  '/product': ProductPage.render,
};

export default Routes;
