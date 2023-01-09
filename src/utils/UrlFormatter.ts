import { IPageParams } from '../database/DataBase.interfaces';

export enum QueryNames {
  CATEGORY = 'category',
  BRAND = 'brand',
  PRICE = 'price',
  STOCK = 'stock',
  MODE = 'mode',
  SORT = 'sort',
  SEARCH = 'search',
}

const VALUE_SEPARATOR = '↕';

class UrlFormatter {
  private url: URL;

  private objQueryParams: IPageParams = {};

  constructor() {
    this.url = new URL(location.href);
  }

  readAllQueryParams(): void {
    this.url = new URL(location.href);

    const temp: Record<string, string> = {};

    [...this.url.searchParams].forEach(([name, values]) => {
      temp[name] = values;
    });

    this.objQueryParams = {
      ...this.objQueryParams,
      category: new Set(temp.category?.split(VALUE_SEPARATOR)),
      brand: new Set(temp.brand?.split(VALUE_SEPARATOR)),
      search: temp.search?.toLowerCase() || '',
      price: temp.price ? [
        +temp.price.split(VALUE_SEPARATOR)[0],
        +temp.price.split(VALUE_SEPARATOR)[1],
      ] : undefined,
      stock: temp.stock ? [
        +temp.stock.split(VALUE_SEPARATOR)[0],
        +temp.stock.split(VALUE_SEPARATOR)[1],
      ] : undefined,
      mode: temp.mode || '',
      sort: temp.sort || '',
    };
  }

  getAllQueryParams(): IPageParams {
    this.readAllQueryParams();
    return this.objQueryParams;
  }

  setFiltersQueryParam(name: string, value: string): void {
    if (!this.url.searchParams.has(name)) {
      this.url.searchParams.append(name, value);
      return;
    }

    const stringParamValue = this.url.searchParams.get(name) as string;
    const convertValues = new Set(stringParamValue.split(VALUE_SEPARATOR)) as Set<string>;

    if (convertValues.has(value)) {
      convertValues.delete(value);
    } else {
      convertValues.add(value);
    }

    if (convertValues.size === 0) {
      this.url.searchParams.delete(name);
    } else {
      this.url.searchParams.set(name, [...convertValues].join(VALUE_SEPARATOR));
    }
  }

  setRangeQueryParam(name: string, value: [number, number]): void {
    if (!this.url.searchParams.has(name)) {
      this.url.searchParams.append(name, this.rangeToString(value));
    } else {
      this.url.searchParams.set(name, this.rangeToString(value));
    }
  }

  setSingleQueryParam(name: string, value: string): void {
    if (!this.url.searchParams.has(name)) {
      this.url.searchParams.append(name, value);
    } else {
      this.url.searchParams.set(name, value);
    }
  }

  rangeToString(range: [number, number]): string {
    return range.join(VALUE_SEPARATOR);
  }

  deleteQueryParam(name: string): void {
    this.url.searchParams.delete(name);
  }

  cleanAllQueryParams(): void {
    this.url.search = '';
  }

  sendParams(cbRender: () => void): void {
    history.pushState(this.url.href, '', this.url.href);
    cbRender();
  }
}

export default UrlFormatter;
