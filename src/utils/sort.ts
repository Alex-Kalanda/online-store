import { IProduct } from '../database/DataBase.interfaces';
import { SortValues } from '../components/Controls/Controls.enum';

const sort = (dataList: IProduct[], sortingType: string): IProduct[] => {
  switch (sortingType) {
    case SortValues.upDiscount:
      return [...dataList].sort((prev, next) => prev.discountPercentage - next.discountPercentage);
    case SortValues.upStock:
      return [...dataList].sort((prev, next) => prev.stock - next.stock);
    case SortValues.downDiscount:
      return [...dataList].sort((prev, next) => next.discountPercentage - prev.discountPercentage);
    case SortValues.downStock:
      return [...dataList].sort((prev, next) => next.stock - prev.stock);
    default:
      return dataList;
  }
};

export default sort;
