import { describe, expect, it } from '@jest/globals';
import camelize from '../camelize';

describe('camelize function', () => {
  it('should return correct value', () => {
    expect(camelize('I can write tests')).toBe('iCanWriteTests');
  });
  it('should return empty string when incomming argument is empty string', () => {
    expect(camelize('')).toBe('');
  });
});
