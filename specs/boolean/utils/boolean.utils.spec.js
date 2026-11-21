const lang = require('../../../');
const errors = require('../../../src/boolean/errors/boolean.errors');

describe('Check [boolean] script of utilities', () => {
  describe('Check [is] utility.', () => {
    it.each([
      { given: true, expected: true },
      { given: false, expected: true },
      { given: undefined, expected: false },
      { given: `true`, expected: false },
      { given: ` string `, expected: false },
      { given: () => true, expected: false }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.boolean.is(given)).toBe(expected);
    });
  });

  describe('Check [not] utility.', () => {
    it.each([
      { given: true, expected: false },
      { given: false, expected: false },
      { given: undefined, expected: true },
      { given: `true`, expected: true },
      { given: ` string `, expected: true },
      { given: () => true, expected: true }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.boolean.not(given)).toBe(expected);
    });
  });

  describe('Check [clean] utility.', () => {
    it.each([
      { value: false, options: undefined, expected: false },
      { value: true, options: undefined, expected: true },
      { value: false, options: {}, expected: false },
      { value: true, options: {}, expected: true },
      { value: false, options: { dft: true }, expected: false },
      { value: true, options: { dft: false }, expected: true },
      { value: false, options: { dft: true }, expected: false },
      { value: 2, options: { dft: 'true' }, expected: false },
      { value: 2, options: { dft: false }, expected: false },
      { value: 2, options: { dft: true }, expected: true }
    ])(
      'should return [$expected] when given [$value] as value and [$options] as options.',
      ({ value, options, expected }) => {
        expect(lang.boolean.clean(value, options)).toBe(expected);
      }
    );
  });

  describe('Check [check] utility.', () => {
    it.each([{ given: true }, { given: false }])('should return given when given [$value].', ({ given }) => {
      expect(lang.boolean.check(given)).toBe(given);
    });

    it.each([{ value: 'true', expected: errors.whenInvalidType() }])(
      'should throw [$expected] when given [$value].',
      ({ value, expected }) => {
        expect(() => lang.boolean.check(value)).toThrow(expected);
      }
    );
  });

  describe('Check [resolve] utility.', () => {
    it.each([{ given: true }, { given: false }])('should resolve given when given [$value].', ({ given }) => {
      expect(lang.boolean.resolve(given)).resolves.toBe(given);
    });

    it.each([{ value: 'true', expected: errors.whenInvalidType() }])(
      'should reject [$expected] when given [$value].',
      ({ value, expected }) => {
        expect(lang.boolean.resolve(value)).rejects.toThrow(expected);
      }
    );
  });

  describe('Check [from] utility.', () => {
    it.each([
      { given: true, expected: true },
      { given: false, expected: false },
      { given: 'true', expected: true },
      { given: 'false', expected: false },
      { given: 1, expected: true },
      { given: 0, expected: false },
      { given: undefined, expected: false },
      { given: new Error(), expected: false }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.boolean.from(given)).toBe(expected);
    });
  });
});
