const lang = require('../../../');
const constants = require('../../../src/fn/constants/fn.constants');

describe('Check [function] script of utilities', () => {
  describe('Check [is] utility.', () => {
    it.each([
      { given: () => {}, expected: true },
      { given: 0, expected: false },
      { given: 2.4, expected: false },
      { given: undefined, expected: false },
      { given: `not-undefined`, expected: false },
      { given: new Error(), expected: false }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.fn.is(given)).toBe(expected);
    });
  });

  describe('Check [not] utility.', () => {
    it.each([
      { given: () => {}, expected: false },
      { given: 0, expected: true },
      { given: 2.4, expected: true },
      { given: undefined, expected: true },
      { given: `not-undefined`, expected: true },
      { given: new Error(), expected: true }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.fn.not(given)).toBe(expected);
    });
  });

  describe('Check [resolve] utility.', () => {
    it('should resolves the when given value', () => {
      expect(lang.fn.resolve('a')).resolves.toBe('a');
    });
  });

  describe('Check [reject] utility.', () => {
    it.each([
      { given: undefined, expected: new Error(constants.unknown) },
      { given: 'error', expected: new Error('error') },
      { given: new Error('an error'), expected: new Error('an error') }
    ])('should rejects $expected the when given $given.', ({ given, expected }) => {
      expect(lang.fn.reject(given)).rejects.toThrow(expected);
    });
  });

  describe('Check [async] utility.', () => {
    it.each([
      { given: undefined, expected: undefined },
      { given: 'a', expected: undefined },
      { given: () => 'b', expected: 'b' },
      { given: () => Promise.resolve('c'), expected: 'c' }
    ])('should resolve [$expected] when given [$given] as value.', ({ given, expected }) => {
      expect(lang.fn.async(given)).resolves.toEqual(expected);
    });

    it.each([
      {
        given: () => {
          throw new Error('d');
        },
        expected: 'd'
      },
      { given: () => Promise.reject(new Error('e')), expected: 'e' }
    ])('should reject $expected when given a function which throw or reject an error.', ({ given, expected }) => {
      expect(lang.fn.async(given)).rejects.toThrow(expected);
    });
  });
});
