import './BasketCoupons.style.scss';
import removeIcon from '../../assets/svg/delete_button.svg';
import { Button, Symbol } from '../../common.types/enums';
import { findElem } from '../../utils/findElem';
import ICoupon from './BasketCoupons.interface';
import Coupons from './Coupons';
import BasketCalc from '../BasketCalc/BasketCalc';

enum Title {
  APPLY = 'Coupon Apply',
  COUPON_PLACEHOLDER = 'Enter promo code',
  TEST_HINT = 'You can use these сoupons for test:',
  ACTIVE = 'Active Coupons:',
}

const REMOVE_BUTTON = 'coupons__active__element__remove';

class BasketCoupons {
  private coupons = new Coupons();

  private basketCalc = new BasketCalc();

  private addListeners(): void {
    setTimeout(() => {
      const input = findElem('.coupons__input__value') as HTMLInputElement;
      const activeCouponsBlock = findElem('.coupons__active');
      const addCouponBlock = findElem('.coupons__res');
      const couponValue = findElem('.coupons__res__value');
      const clearInput = findElem('.coupons__input__clear-button');
      const addCoupon = findElem('.coupons__res__add');

      input.addEventListener('input', () => {
        if (!this.coupons.isExist(input.value)) {
          addCouponBlock.classList.remove('show-block');
          return;
        }

        addCouponBlock.classList.add('show-block');
        const couponFound = this.coupons.getCouponByValue(input.value) as ICoupon;
        couponValue.innerText = `${couponFound.name} - ${couponFound.discount}${Symbol.DISCOUNT}`;

        if (!this.coupons.isActive(input.value)) {
          addCoupon.classList.add('show-block');
        } else {
          addCoupon.classList.remove('show-block');
        }
      });

      clearInput.addEventListener('click', () => {
        input.value = '';
        addCouponBlock.classList.remove('show-block');
      });

      addCoupon.addEventListener('click', () => {
        activeCouponsBlock.classList.add('show-block');
        const coupon = this.coupons.getCouponByValue(input.value);
        activeCouponsBlock.append(this.createActiveCouponBlock(coupon));
        this.coupons.setActiveCoupon(input.value);
        addCoupon.classList.remove('show-block');
        this.basketCalc.updateTotalBlock();
      });

      activeCouponsBlock.addEventListener('click', (event) => {
        const element = event.target as HTMLElement;

        if (element.classList.contains(REMOVE_BUTTON)) {
          const couponBlock = element.closest('.coupons__active__element') as HTMLElement;
          const name = couponBlock.id;
          const coupon = this.coupons.getCouponByValue(name);
          this.coupons.removeActiveCoupon(name);
          couponBlock.remove();
          this.basketCalc.updateTotalBlock();

          if (this.coupons.getAllActiveCoupons().length === 0) {
            activeCouponsBlock.classList.remove('show-block');
          }

          if (coupon.name === input.value) {
            addCoupon.classList.add('show-block');
          }
        }
      });
    });
  }

  private createActiveCouponBlock(coupon: ICoupon): HTMLDivElement {
    const div = document.createElement('div');
    div.classList.add('coupons__active__element');
    div.id = coupon.name;
    div.innerHTML = `
      <span class="coupons__active__element__name">${coupon.name}</span>
      <span class="coupons__active__element__value">${Symbol.DISCOUNT}${coupon.discount}</span>
      <img class="coupons__active__element__remove" src=${removeIcon} alt="remove coupon">
    `;
    return div;
  }

  public render(): string {
    setTimeout(() => {
      if (this.coupons.getAllActiveCoupons().length !== 0) {
        const activeCouponsBlock = findElem('.coupons__active');
        activeCouponsBlock.classList.add('show-block');
        const activeCoupons = this.coupons.getAllActiveCoupons();
        activeCoupons.forEach((coupon: ICoupon) => {
          activeCouponsBlock.append(this.createActiveCouponBlock(coupon));
        });
      }
      this.basketCalc.updateTotalBlock();
    });

    this.addListeners();

    return `
      <div class="coupons">
        <div class="coupons__possible">
          <span class="coupons__possible__title">${Title.TEST_HINT}</span>
          <span class="coupons__possible__value">${this.coupons.getCouponsAsString()}</span>
        </div>
        <span class="coupons__title">${Title.APPLY}</span>
        <div class="coupons__input">
          <input class="coupons__input__value" type="text" placeholder="${Title.COUPON_PLACEHOLDER}">
          <button class="coupons__input__clear-button">${Button.CLEAR_INPUT}</button>
        </div>
        <div class="coupons__res">
          <span class="coupons__res__value"></span>
          <button class="coupons__res__add">${Button.COUPON_ADD}</button>
        </div>
        <div class="coupons__active">
          <p class="coupons__active__title">${Title.ACTIVE}</p>
        </div>
      </div>
      `;
  }
}

export default BasketCoupons;
