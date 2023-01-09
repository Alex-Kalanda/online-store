import { describe, expect, it } from '@jest/globals';
import formatToPascalCase from '../formatToPascalCase';

describe('formatToPascalCase function', () => {
  it('should return correct value', () => {
    expect(formatToPascalCase('more details')).toBe('More Details');
  });
  it('should return empty string when incomming argument is empty string', () => {
    expect(formatToPascalCase('')).toBe('');
  });
});
