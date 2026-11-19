const lang = require('../../../');
const errors = require('../../../src/int/errors/int.errors');

describe('Check [integer] script of utilities', () => {
  describe('Check [is] utility.', () => {
    it.each([
      { given: () => {}, expected: false },
      { given: 0, expected: true },
      { given: 2.0, expected: true },
      { given: 2.4, expected: false },
      { given: undefined, expected: false },
      { given: `not-undefined`, expected: false },
      { given: new Error(), expected: false }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.int.is(given)).toBe(expected);
    });
  });

  describe('Check [not] utility.', () => {
    it.each([
      { given: () => {}, expected: true },
      { given: 0, expected: false },
      { given: 2.0, expected: false },
      { given: 2.4, expected: true },
      { given: undefined, expected: true },
      { given: `not-undefined`, expected: true },
      { given: new Error(), expected: true }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.int.not(given)).toBe(expected);
    });
  });

  describe('Check [clean] utility.', () => {
    it.each([
      { value: 0, options: undefined, expected: 0 },
      { value: 2.4, options: undefined, expected: 0 },
      { value: 2.4, options: { dft: 5 }, expected: 5 },
      { value: 5, options: { min: 6 }, expected: 6 },
      { value: 'N', options: { min: 6, dft: 5 }, expected: 6 },
      { value: 5, options: { max: 4 }, expected: 4 },
      { value: 'N', options: { max: 4, dft: 5 }, expected: 4 }
    ])(
      'should return [$expected] when given [$value] as value and [$options] as options',
      ({ value, options, expected }) => {
        expect(lang.int.clean(value, options)).toBe(expected);
      }
    );
  });

  describe('Check [check] utility.', () => {
    it.each([
      { value: 0, options: undefined, expected: 0 },
      { value: 3, options: { minimum: 3, exclusiveMinimum: 2, maximum: 3, exclusiveMaximum: 4 }, expected: 3 },
      { value: 5, options: { minimum: '4' }, expected: 5 },
      { value: 5, options: { exclusiveMinimum: '5' }, expected: 5 },
      { value: 7, options: { maximum: '6' }, expected: 7 },
      { value: 7, options: { exclusiveMaximum: '7' }, expected: 7 }
    ])(
      'should return [$expected] when given [$value] as value and [$options] as options',
      ({ value, options, expected }) => {
        expect(lang.int.check(value, options)).toBe(expected);
      }
    );

    it.each([
      { value: 'a', options: undefined, expected: errors.whenInvalidType() },
      { value: 1.1, options: undefined, expected: errors.whenInvalidType() },
      { value: 4, options: { minimum: 5 }, expected: errors.whenTooSmall(5, false) },
      { value: 6, options: { exclusiveMinimum: 6 }, expected: errors.whenTooSmall(6, true) },
      { value: 8, options: { maximum: 7 }, expected: errors.whenTooBig(7, false) },
      { value: 8, options: { exclusiveMaximum: 8 }, expected: errors.whenTooBig(8, true) }
    ])(
      'should throw [$expected] when given [$value] as value and [$options] as options',
      ({ value, options, expected }) => {
        expect(() => lang.int.check(value, options)).toThrow(expected);
      }
    );
  });

  describe('Check [resolve] utility.', () => {
    it.each([
      { value: 0, options: undefined, expected: 0 },
      { value: 3, options: { minimum: 3, exclusiveMinimum: 2, maximum: 3, exclusiveMaximum: 4 }, expected: 3 },
      { value: 5, options: { minimum: '4' }, expected: 5 },
      { value: 5, options: { exclusiveMinimum: '5' }, expected: 5 },
      { value: 7, options: { maximum: '6' }, expected: 7 },
      { value: 7, options: { exclusiveMaximum: '7' }, expected: 7 }
    ])(
      'should resolve [$expected] when given [$value] as value and [$options] as options',
      ({ value, options, expected }) => {
        expect(lang.int.resolve(value, options)).resolves.toBe(expected);
      }
    );

    it.each([
      { value: 'a', options: undefined, expected: errors.whenInvalidType() },
      { value: 1.1, options: undefined, expected: errors.whenInvalidType() },
      { value: 4, options: { minimum: 5 }, expected: errors.whenTooSmall(5, false) },
      { value: 6, options: { exclusiveMinimum: 6 }, expected: errors.whenTooSmall(6, true) },
      { value: 8, options: { maximum: 7 }, expected: errors.whenTooBig(7, false) },
      { value: 8, options: { exclusiveMaximum: 8 }, expected: errors.whenTooBig(8, true) }
    ])(
      'should reject [$expected] when given [$value] as value and [$options] as options',
      ({ value, options, expected }) => {
        expect(lang.int.resolve(value, options)).rejects.toThrow(expected);
      }
    );
  });
});
