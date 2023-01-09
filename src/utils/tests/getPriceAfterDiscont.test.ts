import { describe, expect, it } from '@jest/globals';
import getPriceAfterDiscont from '../getPriceAfterDiscont';

describe('getPriceAfterDiscont function', () => {
  it('should return correct value', () => {
    expect(getPriceAfterDiscont(12, 12)).toBe(10.56);
  });
  it('should return correct value when discont equals 0', () => {
    expect(getPriceAfterDiscont(12, 0)).toBe(12.00);
  });
  it('should return correct value when the discount is not an integer', () => {
    expect(getPriceAfterDiscont(25, 0.56)).toBe(24.86);
  });
});
