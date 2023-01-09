import Basket from './Basket';
import { Button } from '../common.types/enums';

const changeStatusButton = (element: HTMLElement, id: number): void => {
  const button = element as HTMLElement;
  const basket = new Basket();
  if (basket.basketContain(id)) {
    button.innerHTML = `${Button.ADD}`;
    button.classList.remove('added');
    basket.removeProductFromBasket(id);
  } else {
    button.innerHTML = `${Button.REMOVE}`;
    button.classList.add('added');
    basket.setProductToBasket(id);
  }
};

export default changeStatusButton;
