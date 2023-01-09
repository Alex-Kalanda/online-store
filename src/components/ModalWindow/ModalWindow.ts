import './ModalWindow.styles.scss';
import { findElem } from '../../utils/findElem';
import getMainBlock from '../../utils/getMainBlock';
import cardLogoDef from '../../assets/img/card-logo.webp';
import cardLogoMaster from '../../assets/img/master_card_pay.png';
import cardLogoUnion from '../../assets/img/union_pay.png';
import cardLogoVisa from '../../assets/img/visa_pay.png';
import createElem from '../../utils/createElem';
import getElemById from '../../utils/getElementById';
import { ModalTitles } from './Modal.enums';
import { Button, Symbol } from '../../common.types/enums';
import Basket from '../../utils/Basket';

class ModalWindow {
  private addListeners() {
    const form = getElemById('form');
    const background = findElem('.modal');
    const name = getElemById('personal-name') as HTMLInputElement;
    const phone = getElemById('personal-phone') as HTMLInputElement;
    const address = getElemById('personal-address') as HTMLInputElement;
    const mail = getElemById('personal-main') as HTMLInputElement;
    const cardNumber = getElemById('card-number') as HTMLInputElement;
    const cardValid = getElemById('card-valid') as HTMLInputElement;
    const cardCVV = getElemById('card-cvv') as HTMLInputElement;
    const cardLogo = findElem('.modal-content__card-details__card__logo') as HTMLImageElement;
    const regName = /^([a-zA-Z]{3,})[ ]([a-zA-Z]{3,})(([a-zA-Z]{0,}){0,})/gm;
    const regPhone = /^[+]([0-9]{9,})/gm;
    const regAddress = /^([a-zA-Z.,/]{5,})[ ]([a-zA-Z.,/]{5,})[ ]([a-zA-Z.,/]{5,})(([a-zA-Z.,/]{0,}){0,})/gm;
    const regMail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/gm;
    const regCardNumber = /^[0-9]{16}/gm;
    const regValid = /^(0[1-9]|1[1-2])\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])/gm;
    const regCVV = /^[0-9]{3}/gm;

    background.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;

      if (targetElement.classList.contains('modal')) this.remove();
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const errorMessages = [...document.querySelectorAll('.error-message')];
      errorMessages.forEach((error) => {
        error.remove();
      });
      let findError = false;

      if (!name.value.match(regName)) {
        this.showErrorMessage(name, 'Error');
        findError = true;
      }

      if (!phone.value.match(regPhone)) {
        this.showErrorMessage(phone, 'Error');
        findError = true;
      }

      if (!address.value.match(regAddress)) {
        this.showErrorMessage(address, 'Error');
        findError = true;
      }

      if (!mail.value.match(regMail)) {
        this.showErrorMessage(mail, 'Error');
        findError = true;
      }

      if (!cardNumber.value.split(' ').join('').match(regCardNumber)) {
        this.showErrorMessage(cardNumber, 'Card number - error');
        findError = true;
      }

      if (!cardValid.value.match(regValid)) {
        this.showErrorMessage(cardValid, 'Card valid thru - error');
        findError = true;
      }

      if (!cardCVV.value.match(regCVV)) {
        this.showErrorMessage(cardCVV, 'Card CVV - error');
        findError = true;
      }

      if (!findError) {
        this.remove();
        new Basket().clear();
        this.showProcessingState();
      }
    });

    form.addEventListener('input', (event) => {
      const targetElem = event.target as HTMLElement;

      if (targetElem.id === 'card-number') {
        if (cardNumber.value.match(/[^0-9]/g)) {
          cardNumber.value = cardNumber.value.replace(/[^\d]/g, '');
        }

        cardNumber.value = cardNumber.value.replace(/(\d{4})(?!\s|$)/gm, '$1 ');
        const firdtNumCard = cardNumber.value[0];

        switch (firdtNumCard) {
          case '4':
            cardLogo.src = cardLogoVisa;
            break;
          case '5':
            cardLogo.src = cardLogoMaster;
            break;
          case '6':
            cardLogo.src = cardLogoUnion;
            break;
          default:
            cardLogo.src = cardLogoDef;
        }
      }

      if (targetElem.id === 'card-valid') cardValid.value = cardValid.value.replace(/(\d{2})(?!\/|$)/gm, '$1/');

      if (targetElem.id === 'card-cvv') {
        if (cardCVV.value.match(/[^0-9]/g)) cardCVV.value = cardCVV.value.replace(/[^\d]/g, '');
      }
    });
  }

  private showErrorMessage(elem: HTMLElement, text: string): void {
    const parent = elem.closest('.modal-content__personal-details__item__value') as HTMLElement;
    const error = createElem('div', '', 'error-message');
    error.innerText = text;
    parent.append(error);
  }

  private remove() {
    const modal = findElem('.modal');
    modal.remove();
    const main = getMainBlock();
    main.classList.remove('overflow');
  }

  private showProcessingState() {
    const main = getMainBlock();
    main.innerHTML = '';
    const div = createElem('div', '', 'order-complete');
    let timeInSeconds = 4;
    div.innerHTML = `Thanks for your order. Redirect to the store after ${timeInSeconds} sec.`;
    const showMessage = setInterval(() => {
      timeInSeconds -= 1;
      div.innerHTML = `Thanks for your order. Redirect to the store after ${timeInSeconds} sec.`;
    }, 1000);
    setTimeout(() => {
      clearInterval(showMessage);
      window.location.href = '/';
    }, 4000);
    main.append(div);
  }

  public render(): void {
    const div = createElem('div', '', 'modal');
    const main = getMainBlock();
    main.append(div);
    main.classList.add('overflow');
    div.innerHTML = `
        <form id="form" class="modal-content" novalidate>
          <div class="modal-content__personal-details">
            <div class="modal-content__personal-details__title">${ModalTitles.PERSONAL_MAIN}</div>
            <div class="modal-content__personal-details__item">
              <div class="modal-content__personal-details__item__title">
                <span class="modal-content__personal-details__item__title__value">${ModalTitles.NAME}</span>
                <span class="modal-content__personal-details__item__title__mark">${Symbol.MANDATORY}</span>
              </div>
              <div class="modal-content__personal-details__item__value">
                <input id="personal-name" class="modal-content__personal-details__item__value__input" type="text" placeholder="Name">
              </div>
            </div>
            <div class="modal-content__personal-details__item">
              <div class="modal-content__personal-details__item__title">
                <span class="modal-content__personal-details__item__title__value">${ModalTitles.PHONE}r</span>
                <span class="modal-content__personal-details__item__title__mark">${Symbol.MANDATORY}</span>
              </div>
              <div class="modal-content__personal-details__item__value">
                <input id="personal-phone" class="modal-content__personal-details__item__value__input" type="text" placeholder="Phone number">
              </div>
            </div>
            <div class="modal-content__personal-details__item">
              <div class="modal-content__personal-details__item__title">
                <span class="modal-content__personal-details__item__title__value">${ModalTitles.ADDRESS}</span>
                <span class="modal-content__personal-details__item__title__mark">${Symbol.MANDATORY}</span>
              </div>
              <div class="modal-content__personal-details__item__value">
                <input id="personal-address" class="modal-content__personal-details__item__value__input" type="text" placeholder="Delivery address">
              </div>
            </div>
            <div class="modal-content__personal-details__item">
              <div class="modal-content__personal-details__item__title">
                <span class="modal-content__personal-details__item__title__value">${ModalTitles.MAIL}</span>
                <span class="modal-content__personal-details__item__title__mark">${Symbol.MANDATORY}</span>
              </div>
              <div class="modal-content__personal-details__item__value">
                <input id="personal-main" class="modal-content__personal-details__item__value__input" type="text" placeholder="E-mail">
              </div>
            </div>
          </div>
          <div class="modal-content__card-details modal-content__personal-details__item__value">
            <div class="modal-content__card-details__title">${ModalTitles.CARD_MAIL}</div>
            <div class="modal-content__card-details__card">
              <div class="modal-content__card-details__card__number">
                <img class="modal-content__card-details__card__logo" src="${cardLogoDef}" alt="payment system">
                <input type="text" id="card-number" placeholder="Card number" maxlength="19">
              </div>
              <div class="modal-content__card-details__card__other">
                <div class="modal-content__card-details__card__other__valid">
                  <span>${ModalTitles.VALID}</span>
                  <input type="text" id="card-valid" placeholder="Valid Thru" maxlength="5">
                </div>
                <div class="modal-content__card-details__card__other__cvv">
                  <span>${ModalTitles.CVV}</span>
                  <input type="text" id="card-cvv" placeholder="Code" maxlength="3" >
                </div>
              </div>
            </div>
          </div>
          <button id="form-submit" class="modal-content__submit" type="submit">${Button.CONFIRM}</button>
        </form>
    `;

    this.addListeners();
  }
}

export default ModalWindow;
