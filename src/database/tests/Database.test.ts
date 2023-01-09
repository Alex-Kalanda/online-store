import { describe, expect, it } from '@jest/globals';
import Database from '../Database';

describe('Database class', () => {
  describe('getProductById method', () => {
    it('should return correct value', () => {
      expect(Database.getProductById(1)).toEqual({
        brand: 'RECUTMS',
        category: 'Home Decorations',
        description: 'This greenery garland combines red berry picks made of foam balls painted vivid poinsettia color, leaves are made of quality plastic, the garland stems are made of flexible wire, can be shaped freely to meet any space of decorations. The Size of red flowers is 14cm/5.5inches. ',
        discountPercentage: 13,
        id: 1,
        images: [
          'https://github.com/MarinaStepanchuk/online-store-card-pictures/blob/main/1/1.jpg?raw=true',
          'https://github.com/MarinaStepanchuk/online-store-card-pictures/blob/main/1/2.jpg?raw=true',
          'https://github.com/MarinaStepanchuk/online-store-card-pictures/blob/main/1/3.jpg?raw=true',
        ],
        price: 18.98,
        rating: 3.4,
        stock: 75,
        thumbnail: 'https://github.com/MarinaStepanchuk/online-store-card-pictures/blob/main/1/1.jpg?raw=true',
        title: 'Gengki 6.4Ft Christmas Garland',
      });
    });
    it('should return undefined when product is not exsists in database', () => {
      expect(Database.getProductById(10000000000)).toBeUndefined();
    });
  });
});
