import { describe, expect, it } from '@jest/globals';
import DataAttrConverter from '../DataAttrConverter';

describe('DataAttrConverter class', () => {
  describe('encode method', () => {
    it('should return correct value', () => {
      expect(DataAttrConverter.encode('I have good code')).toEqual('I_have_good_code');
    });
    it('should return empty string when incomming argument is empty string', () => {
      expect(DataAttrConverter.encode('')).toEqual('');
    });
  });
  describe('decode method', () => {
    it('should return correct value', () => {
      expect(DataAttrConverter.decode('I_have_good_code')).toEqual('I have good code');
    });
    it('should return empty string when incomming argument is empty string', () => {
      expect(DataAttrConverter.decode('')).toEqual('');
    });
  });
});
