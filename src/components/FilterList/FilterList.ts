import camelize from '../../utils/camelize';
import './FilterList.style.scss';
import { IFilterOptions } from '../../database/DataBase.interfaces';
import { Events } from '../../common.types/enums';
import DataAttrConverter from '../../utils/DataAttrConverter';
import { FilterTitle } from '../../database/DataBase.types';
import UrlFormatter from '../../utils/UrlFormatter';
import Handler from '../../utils/Handler';

class FilterList {
  constructor(
    private readonly filterTitle: string, // must be one word without spaces!
    private readonly filtersList: Record<string, IFilterOptions>,
    private readonly cbRender: () => void,
  ) {
    this.filterTitle = filterTitle;
    this.filtersList = filtersList;
    this.cbRender = cbRender;
  }

  render(): string {
    this.setHandler();
    return this.getFilterCategories();
  }

  getFilterItem(name: string, {
    active, total, isAvailable, isChecked,
  }: IFilterOptions): string {
    const id = `${camelize(name)}${this.filterTitle}`;

    return `
      <li class="filter__item">
        <input id=${id} class="filter__item__input ${isAvailable ? 'available' : ''}"
          ${isChecked ? 'checked' : ''} type="checkbox"
          data-filter-area-name=${this.filterTitle} data-filter-name=${DataAttrConverter.encode(name)} >
        <label for=${id} class="filter__item__label">
          <span class="filter__item__name">${name}</span>
          <span class="filter__item__amount-block">(${active}/${total})</span>
        </label>
      </li>`;
  }

  getFilterCategories(): string {
    let filterItems = '';
    const categoryNames = Object.keys(this.filtersList) as string[];

    categoryNames.forEach((name: string) => {
      filterItems += this.getFilterItem(name, this.filtersList[name]);
    });

    return `
      <div class="filter filters__${this.filterTitle.toLowerCase()}">
        <h3 class="h3 filter__title">${this.filterTitle}</h3>
        <ul class="filter__list ${this.filterTitle.toLowerCase()}">
          ${filterItems}
        </ul>
      </div>`;
  }

  setHandler():void {
    Handler.set(Events.CLICK, (e: Event) => {
      const target = e.target as HTMLInputElement;

      if (target.dataset.filterAreaName && target.dataset.filterName) {
        const { filterAreaName, filterName } = target.dataset;

        const correctAreaName = filterAreaName.toLowerCase() as FilterTitle;
        const correctName = DataAttrConverter.decode(filterName) as string;

        const urlFormatter = new UrlFormatter();
        urlFormatter.setFiltersQueryParam(correctAreaName, correctName);
        urlFormatter.sendParams(this.cbRender);
      }
    }, `.filters__${this.filterTitle.toLowerCase()}`);
  }
}

export default FilterList;
