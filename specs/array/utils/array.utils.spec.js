const lang = require('../../../');
const errors = require('../../../src/boolean/errors/boolean.errors');

describe('Check [array] script of utilities', () => {
  describe('Check [is] utility.', () => {
    it.each([
      { given: undefined, expected: false },
      { given: false, expected: false },
      { given: [], expected: true },
      { given: ['1', '2', '3'], expected: true }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.array.is(given)).toBe(expected);
    });
  });

  describe('Check [isEmpty] utility.', () => {
    it.each([
      { given: undefined, expected: true },
      { given: false, expected: true },
      { given: [], expected: true },
      { given: ['1', '2', '3'], expected: false }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.array.isEmpty(given)).toBe(expected);
    });
  });

  describe('Check [length] utility.', () => {
    it.each([
      { given: undefined, expected: 0 },
      { given: false, expected: 0 },
      { given: [], expected: 0 },
      { given: ['1', '2', '3'], expected: 3 }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.array.length(given)).toBe(expected);
    });
  });

  describe('Check [not] utility.', () => {
    it.each([
      { given: undefined, expected: true },
      { given: false, expected: true },
      { given: [], expected: false },
      { given: ['1', '2', '3'], expected: false }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.array.not(given)).toBe(expected);
    });
  });

  describe('Check [notEmpty] utility.', () => {
    it.each([
      { given: undefined, expected: false },
      { given: false, expected: false },
      { given: [], expected: false },
      { given: ['1', '2', '3'], expected: true }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.array.notEmpty(given)).toBe(expected);
    });
  });
});
