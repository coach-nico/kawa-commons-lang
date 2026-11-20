const lang = require('../../../');
const errors = require('../../../src/object/errors/object.errors');

describe('Check [object] script of utilities', () => {
  describe('Check [is] utility.', () => {
    it.each([
      { given: false, expected: false },
      { given: undefined, expected: false },
      { given: `true`, expected: false },
      { given: () => {}, expected: false },
      { given: Object, expected: false },
      { given: {}, expected: true },
      { given: new Object(), expected: true }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.object.is(given)).toBe(expected);
    });
  });

  describe('Check [not] utility.', () => {
    it.each([
      { given: false, expected: true },
      { given: undefined, expected: true },
      { given: `true`, expected: true },
      { given: () => {}, expected: true },
      { given: Object, expected: true },
      { given: {}, expected: false },
      { given: new Object(), expected: false }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.object.not(given)).toBe(expected);
    });
  });

  describe('Check [get class] utility.', () => {
    it.each([
      { given: false, expected: null },
      { given: undefined, expected: null },
      { given: `true`, expected: null },
      { given: () => {}, expected: null },
      { given: Object, expected: null },
      { given: {}, expected: Object },
      { given: new Object(), expected: Object },
      { given: new Error(), expected: Error }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.object.getClass(given)).toBe(expected);
    });
  });

  describe('Check [get class name] utility.', () => {
    it.each([
      { given: false, expected: null },
      { given: undefined, expected: null },
      { given: `true`, expected: null },
      { given: () => {}, expected: null },
      { given: Object, expected: null },
      { given: {}, expected: 'Object' },
      { given: new Object(), expected: 'Object' },
      { given: new Error(), expected: 'Error' }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.object.getClassName(given)).toBe(expected);
    });
  });

  describe('Check [check] utility.', () => {
    it.each([{ given: {} }, { given: new Object() }])('should return given when given [$value].', ({ given }) => {
      expect(lang.object.check(given)).toBe(given);
    });

    it.each([{ value: Object, expected: errors.whenInvalidType() }])(
      'should throw [$expected] when given [$value].',
      ({ value, expected }) => {
        expect(() => lang.object.check(value)).toThrow(expected);
      }
    );
  });

  describe('Check [resolve] utility.', () => {
    it.each([{ given: {} }, { given: new Object() }])('should resolve given when given [$value].', ({ given }) => {
      expect(lang.object.resolve(given)).resolves.toBe(given);
    });

    it.each([{ value: Object, expected: errors.whenInvalidType() }])(
      'should throw [$expected] when given [$value].',
      ({ value, expected }) => {
        expect(lang.object.resolve(value)).rejects.toThrow(expected);
      }
    );
  });
});
