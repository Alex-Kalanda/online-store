import { describe, expect, it } from '@jest/globals';
import Coupons from '../Coupons';
import { getLocalStorageMock } from '../../../StorageMock';
import { LSKeys } from '../../../common.types/enums';

global.localStorage = getLocalStorageMock();

describe('Coupons class', () => {
  describe('getCouponsAsString method', () => {
    it('should return correct value', () => {
      expect(new Coupons().getCouponsAsString()).toEqual('TREE, CHRISTMASS, TOY, DECORATIONS, NEWYEAR');
    });
  });
  describe('isExist method', () => {
    it('should return false if value not exsists', () => {
      expect(new Coupons().isExist('JS')).toBeFalsy();
    });
    it('should return true if value exsists', () => {
      expect(new Coupons().isExist('TREE')).toBeTruthy();
    });
  });
  describe('setActiveCoupon method', () => {
    it('should set coupon to local storage', () => {
      expect(localStorage.getItem(LSKeys.coupons)).toBeNull();
      new Coupons().setActiveCoupon('TREE');
      expect(localStorage.getItem(LSKeys.coupons)).toBe('[{"name":"TREE","discount":5}]');
    });
  });
  describe('getCouponByValue method', () => {
    it('should return correct coupon', () => {
      expect(new Coupons().getCouponByValue('TOY')).toEqual({ discount: 7, name: 'TOY' });
    });
  });
});
