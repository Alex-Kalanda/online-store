import './FilterRange.style.scss';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { findElem } from '../../utils/findElem';
import UrlFormatter from '../../utils/UrlFormatter';
import { IRangeOptions } from './FilterRange.interface';
import { SliderEvents } from './FilterRange.enum';
import { RangeTitle } from './FilterRange.type';

const MIN_MAX_SEPARATOR = ' - ';

class FilterRange {
  private sliderId = '';

  constructor(private readonly opt: IRangeOptions) {
    this.opt = opt;
  }

  render(): string {
    const [lowest, highest] = this.opt.currentPoses;
    const additionRangeName = this.opt.rangeTitle.toLowerCase();
    this.sliderId = `range-${additionRangeName}`;
    this.createSlider();

    return `
      <div class="range ranges__${additionRangeName}">
        <h3 class="h3 range__title">${this.opt.rangeTitle}</h3>
        <div id=${this.sliderId} class="range__line"></div>
        <div class="range__values">
          <span id="${this.opt.rangeTitle}__min" class="range__values__min">${this.opt.symbol + lowest}</span>
          ${MIN_MAX_SEPARATOR}
          <span id="${this.opt.rangeTitle}__max" class="range__values__max">${this.opt.symbol + highest}</span>
        </div>
      </div>        
      `;
  }

  createSlider(): void {
    const [lowest, highest] = this.opt.scaleLimits;

    const timer = setTimeout(() => {
      noUiSlider.create(findElem(`#${this.sliderId}`), {
        start: [...this.opt.currentPoses],
        connect: true,
        range: {
          min: lowest,
          max: highest,
        },
        step: this.opt.step,
      });

      clearTimeout(timer);
    });

    this.setHandler();
  }

  setHandler():void {
    setTimeout(() => {
      const range = document.getElementById(this.sliderId) as noUiSlider.Instance;
      const minElement = findElem(`#${this.opt.rangeTitle}__min`) as HTMLSpanElement;
      const maxElement = findElem(`#${this.opt.rangeTitle}__max`) as HTMLSpanElement;

      range.noUiSlider.on(SliderEvents.SLIDE, (values): void => {
        const [min, max] = values;
        minElement.innerText = `${this.opt.symbol}${Number(min).toFixed(this.opt.symbolsAfterComma)}`;
        maxElement.innerText = `${this.opt.symbol}${Number(max).toFixed(this.opt.symbolsAfterComma)}`;
      });
      range.noUiSlider.on(SliderEvents.END, (values): void => {
        const correctRangeName = this.opt.rangeTitle.toLowerCase() as RangeTitle;

        const urlFormatter = new UrlFormatter();
        urlFormatter.setRangeQueryParam(correctRangeName, values);
        urlFormatter.sendParams(this.opt.cbRender);
      });
    });
  }
}

export default FilterRange;
