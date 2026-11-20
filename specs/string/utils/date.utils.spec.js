const lang = require('../../../');
const errors = require('../../../src/string/errors/string.errors');

describe('Check [date] script of utilities', () => {
  describe('Check [is] utility.', () => {
    it.each([
      { given: '1981-10-18', expected: true },
      { given: ' 1981-10-18 ', expected: true },
      { given: '1981-10-18T23:45:12.364Z', expected: true },
      { given: ' 1981-10-18T23:45:12.364Z ', expected: true },
      { given: '1981-10-19T00:45:12.364+01:00', expected: true },
      { given: ' 1981-10-19T00:45:12.364+01:00 ', expected: true },
      { given: '23:45:12.364', expected: false },
      { given: '00:45:12.364+01:00', expected: false },
      { given: undefined, expected: false },
      { given: new Error(), expected: false },
      { given: 0, expected: false },
      { given: `string`, expected: false }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.string.date.is(given)).toBe(expected);
    });
  });

  describe('Check [not] utility.', () => {
    it.each([
      { given: '1981-10-18', expected: false },
      { given: ' 1981-10-18 ', expected: false },
      { given: '1981-10-18T23:45:12.364Z', expected: false },
      { given: ' 1981-10-18T23:45:12.364Z ', expected: false },
      { given: '1981-10-19T00:45:12.364+01:00', expected: false },
      { given: ' 1981-10-19T00:45:12.364+01:00 ', expected: false },
      { given: '23:45:12.364', expected: true },
      { given: '00:45:12.364+01:00', expected: true },
      { given: undefined, expected: true },
      { given: new Error(), expected: true },
      { given: 0, expected: true },
      { given: `string`, expected: true }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.string.date.not(given)).toBe(expected);
    });
  });

  describe('Check [check] utility.', () => {
    it.each([
      { given: '1981-10-18', expected: '1981-10-18' },
      { given: ' 1981-10-18 ', expected: '1981-10-18' },
      { given: '1981-10-18T23:45:12.364Z', expected: '1981-10-18T23:45:12.364Z' },
      { given: ' 1981-10-18T23:45:12.364Z ', expected: '1981-10-18T23:45:12.364Z' },
      { given: '1981-10-19T00:45:12.364+01:00', expected: '1981-10-19T00:45:12.364+01:00' },
      { given: ' 1981-10-19T00:45:12.364+01:00 ', expected: '1981-10-19T00:45:12.364+01:00' }
    ])('should return [$expected] when given [$given].', ({ given, expected }) => {
      expect(lang.string.date.check(given)).toBe(expected);
    });

    it.each([
      { given: undefined, expected: 'The value MUST be a string.' },
      { given: new Error(), expected: 'The value MUST be a string.' },
      { given: 0, expected: 'The value MUST be a string.' },
      { given: `string`, expected: `The value MUST have a valid date / time format.` },
      { given: '23:45:12.364', expected: `The value MUST have a valid date / time format.` },
      { given: '00:45:12.364+01:00', expected: `The value MUST have a valid date / time format.` }
    ])('should throw [$expected] when given [$given].', ({ given, expected }) => {
      expect(() => lang.string.date.check(given)).toThrow(expected);
    });
  });

  describe('Check [resolve] utility.', () => {
    it.each([
      { given: '1981-10-18', expected: '1981-10-18' },
      { given: ' 1981-10-18 ', expected: '1981-10-18' },
      { given: '1981-10-18T23:45:12.364Z', expected: '1981-10-18T23:45:12.364Z' },
      { given: ' 1981-10-18T23:45:12.364Z ', expected: '1981-10-18T23:45:12.364Z' },
      { given: '1981-10-19T00:45:12.364+01:00', expected: '1981-10-19T00:45:12.364+01:00' },
      { given: ' 1981-10-19T00:45:12.364+01:00 ', expected: '1981-10-19T00:45:12.364+01:00' }
    ])('should resolve [$expected] when given [$given].', ({ given, expected }) => {
      expect(lang.string.date.resolve(given)).resolves.toBe(expected);
    });

    it.each([
      { given: undefined, expected: 'The value MUST be a string.' },
      { given: new Error(), expected: 'The value MUST be a string.' },
      { given: 0, expected: 'The value MUST be a string.' },
      { given: `string`, expected: `The value MUST have a valid date / time format.` },
      { given: '23:45:12.364', expected: `The value MUST have a valid date / time format.` },
      { given: '00:45:12.364+01:00', expected: `The value MUST have a valid date / time format.` }
    ])('should reject [$expected] when given [$given].', ({ given, expected }) => {
      expect(lang.string.date.resolve(given)).rejects.toThrow(expected);
    });
  });
});
