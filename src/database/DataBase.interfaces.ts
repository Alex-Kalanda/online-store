export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  category: string;
  brand: string;
  thumbnail: string;
  images: string[];
}

export interface IPageParams {
  category?: Set<string>,
  brand?: Set<string>,
  price?: [number, number],
  stock?: [number, number],
  mode?: string,
  sort?: string,
  search?: string,
}

export interface IFilterOptions {
  active: number,
  total: number,
  isAvailable: boolean,
  isChecked: boolean,
}

export interface IProcessedData {
  productsId: Set<number>;
  categories: Record<string, IFilterOptions>,
  brands: Record<string, IFilterOptions>,
  search: string,
  priceScale: [number, number],
  stockScale: [number, number],
  price: [number, number],
  stock: [number, number],
  mode: string,
  sort: string,
}
