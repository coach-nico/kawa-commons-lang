const lang = require('../../../');

describe('Check [string] script of utilities', () => {
  describe('Check [is] utility.', () => {
    it.each([
      { given: undefined, expected: true },
      { given: ``, expected: false },
      { given: `string`, expected: false },
      { given: 0, expected: false },
      { given: false, expected: false },
      { given: new Error(), expected: false }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.undefined.is(given)).toBe(expected);
    });
  });

  describe('Check [not] utility.', () => {
    it.each([
      { given: undefined, expected: false },
      { given: ``, expected: true },
      { given: `string`, expected: true },
      { given: 0, expected: true },
      { given: false, expected: true },
      { given: new Error(), expected: true }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.undefined.not(given)).toBe(expected);
    });
  });
});
