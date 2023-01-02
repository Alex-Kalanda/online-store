import camelize from '../../utils/camelize';
import './FilterList.style.scss';
import { IFilterOptions } from '../../database/DataBase.interfaces';
import FilterListHandler from './FilterList.handler';
import { Events } from '../../common.types/enums';
import UrlFormater from '../../utils/UrlFormater';
// import UrlFormater, { QueryNames } from '../../utils/UrlFormater';

// const formater = new UrlFormater();
// formater.setQueryParam(QueryNames.CATEGORY, 'Home edition');
// formater.setQueryParam(QueryNames.CATEGORY, 'kakadu');
// formater.setQueryParam(QueryNames.BRAND, 'Hosdgfg');
// formater.setQueryParam(QueryNames.BRAND, 'laptop');
// formater.setQueryParam(QueryNames.SEARCH, 'AMD asdedition');
// formater.setQueryParam(QueryNames.SEARCH, 'best choice');

class FilterList {
  constructor(
    private readonly filterTitle: string,
    private readonly filtersList: Record<string, IFilterOptions>,
  ) {
    this.filterTitle = filterTitle;
    this.filtersList = filtersList;
  }

  render(): string {
    FilterListHandler.setEvent(Events.CLICK, (e: Event) => {
      const target = e.target as HTMLElement;

      if (target.dataset.filterAreaName && target.dataset.filterName) {
        const filterTitle = target.dataset.filterAreaName as string;
        const filterName = target.dataset.filterName as string;

        new UrlFormater().setQueryParam(filterTitle.toLowerCase(), filterName);
      }
    }, `.filters__${this.filterTitle.toLowerCase()}`);

    return this.getFilterCategories();
  }

  getFilterItem(name: string, { active, total, isEmphasized }: IFilterOptions): string {
    const id = `${camelize(name)}${this.filterTitle}`;

    return `
      <li class="filter__item">
        <input id=${id} class="filter__item__input" ${isEmphasized ? 'checked' : ''} 
        data-filter-area-name=${this.filterTitle} data-filter-name=${encodeURI(name)} type="checkbox">
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
}

export default FilterList;
