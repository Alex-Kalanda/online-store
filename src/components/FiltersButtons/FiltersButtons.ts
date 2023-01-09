import './FiltersButtons.style.scss';
import Handler from '../../utils/Handler';
import { Events } from '../../common.types/enums';
import UrlFormatter from '../../utils/UrlFormatter';

const COPY_BTN_INNER_TEXT = 'Copy link';
const COPY_BTN_INNER_TEXT_ACTIVE = 'Copied!';
const RESET_BTN_INNER_TEXT = 'Reset filters';
const TIME_BETWEEN_STATES = 2000;

class FiltersButtons {
  constructor(private readonly cbRender: () => void) {
    this.cbRender = cbRender;
  }

  render(): string {
    this.setHandler();

    return `
      <div class="filters__buttons">
        <button class="filters__buttons__item" id="copy-link">${COPY_BTN_INNER_TEXT}</button>
        <button class="filters__buttons__item" id="reset-filters">${RESET_BTN_INNER_TEXT}</button>
      </div>
      `;
  }

  setHandler():void {
    Handler.set(Events.CLICK, () => {
      const urlFormatter = new UrlFormatter();
      urlFormatter.cleanAllQueryParams();
      urlFormatter.sendParams(this.cbRender);
    }, '#reset-filters');

    Handler.set(Events.CLICK, (e: Event) => {
      const button = e.target as HTMLButtonElement;
      const text = `${location.href}`;

      navigator.clipboard.writeText(text)
        .then(() => {
          button.innerText = COPY_BTN_INNER_TEXT_ACTIVE;
          setTimeout(() => {
            button.innerText = COPY_BTN_INNER_TEXT;
          }, TIME_BETWEEN_STATES);
        });
    }, '#copy-link');
  }
}

export default FiltersButtons;
