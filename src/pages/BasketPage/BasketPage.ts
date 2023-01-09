import './BasketPage.style.scss';
import BasketControl from '../../components/BasketControl/BasketControl';
import { IBasketProduct } from '../../components/BasketProduct/BasketProduct.interface';
import BasketCalc from '../../components/BasketCalc/BasketCalc';
import BasketCoupons from '../../components/BasketCoupons/BasketCoupons';
import getMainBlock from '../../utils/getMainBlock';
import Basket from '../../utils/Basket';
import BasketGoods from '../../components/BasketGoods/BasketGoods';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import { LSKeys } from '../../common.types/enums';

class BasketPage {
  static render(): void {
    const control = new BasketControl(BasketPage.reRender).render();
    const basketListOfProds: IBasketProduct[] = new Basket().getBasketList();
    const basketGoods = new BasketGoods(basketListOfProds, BasketPage.reRender).render();
    const basketCalc = new BasketCalc().render();
    const basketPromo = new BasketCoupons().render();
    const main = getMainBlock();

    if (new Basket().getBasketAmount() !== 0) {
      main.innerHTML = `
      <div class="basket">
        <section class="basket__content">
          ${control}
          ${basketGoods}
        </section>
        <section class="basket__aside-block">
          ${basketCalc}
          ${basketPromo}
        </section>
      <div>
    `;
    } else {
      main.innerHTML = `
      <div class="basket-empty">
        Cart is Empty
      <div>
    `;
    }

    if (localStorage.modalHS) {
      new ModalWindow().render();
      localStorage.removeItem(LSKeys.modal);
    }
  }

  static reRender() {
    BasketPage.render();
  }
}

export default BasketPage;
