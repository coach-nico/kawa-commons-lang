const lang = require('../../../');
const errors = require('../../../src/string/errors/string.errors');

describe('Check [string] script of utilities', () => {
  describe('Check [is] utility.', () => {
    it.each([
      { given: ``, expected: true },
      { given: ` `, expected: true },
      { given: `string`, expected: true },
      { given: ` string `, expected: true },
      { given: () => {}, expected: false },
      { given: 0, expected: false },
      { given: 2.0, expected: false },
      { given: 2.4, expected: false },
      { given: undefined, expected: false },
      { given: new Error(), expected: false }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.string.is(given)).toBe(expected);
    });
  });

  describe('Check [not] utility.', () => {
    it.each([
      { given: ``, expected: false },
      { given: ` `, expected: false },
      { given: `string`, expected: false },
      { given: ` string `, expected: false },
      { given: () => {}, expected: true },
      { given: 0, expected: true },
      { given: 2.0, expected: true },
      { given: 2.4, expected: true },
      { given: undefined, expected: true },
      { given: new Error(), expected: true }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.string.not(given)).toBe(expected);
    });
  });

  describe('Check [trim] utility.', () => {
    it.each([
      { given: undefined, expected: `` },
      { given: 0, expected: `` },
      { given: ``, expected: `` },
      { given: ` `, expected: `` },
      { given: `string`, expected: `string` },
      { given: ` string `, expected: `string` }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.string.trim(given)).toBe(expected);
    });
  });

  describe('Check [length] utility.', () => {
    it.each([
      { given: undefined, expected: 0 },
      { given: 0, expected: 0 },
      { given: ``, expected: 0 },
      { given: ` `, expected: 1 },
      { given: `string`, expected: 6 },
      { given: ` string `, expected: 8 }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.string.length(given)).toBe(expected);
    });
  });

  describe('Check [is empty] utility.', () => {
    it.each([
      { given: undefined, expected: true },
      { given: 0, expected: true },
      { given: ``, expected: true },
      { given: ` `, expected: false },
      { given: `string`, expected: false },
      { given: ` string `, expected: false }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.string.isEmpty(given)).toBe(expected);
    });
  });

  describe('Check [is blank] utility.', () => {
    it.each([
      { given: undefined, expected: true },
      { given: 0, expected: true },
      { given: ``, expected: true },
      { given: ` `, expected: true },
      { given: `string`, expected: false },
      { given: ` string `, expected: false }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.string.isBlank(given)).toBe(expected);
    });
  });

  describe('Check [test] utility.', () => {
    it.each([
      { value: undefined, pattern: undefined, expected: false },
      { value: 'toto', pattern: undefined, expected: true },
      { value: 'toto', pattern: 2, expected: true },
      { value: '1234', pattern: /^[0-9]{4}$/, expected: true },
      { value: '4567', pattern: new RegExp('[0-9]{4}$'), expected: true },
      { value: '8901', pattern: '[0-9]{4}$', expected: true },
      { value: 'a', pattern: /^[a]{1}$/i, expected: true },
      { value: 'A', pattern: /^[a]{1}$/i, expected: true },
      { value: ' a ', pattern: /^[a]{1}$/i, expected: false },
      { value: 'b', pattern: new RegExp('[B]{1}', 'i'), expected: true },
      { value: 'B', pattern: new RegExp('[B]{1}', 'i'), expected: true },
      { value: ' c ', pattern: new RegExp('[b]{1}', 'i'), expected: false },
      { value: 'c', pattern: '^[C]{1}$', expected: false },
      { value: 'C', pattern: '^[C]{1}$', expected: true },
      { value: ' c ', pattern: '^[C]{1}$', expected: false }
    ])(
      'should return [$expected] when given [$value] as value and [$pattern] as pattern.',
      ({ value, pattern, expected }) => {
        expect(lang.string.test(value, pattern)).toBe(expected);
      }
    );
  });

  describe('Check [check] utility.', () => {
    it.each([
      { value: 'toto', options: undefined, expected: 'toto' },
      { value: 'toto', options: {}, expected: 'toto' },
      { value: 'toto', options: { minLength: 4, maxLength: 4, pattern: /^[a-z]{4}$/i }, expected: 'toto' },
      { value: 'toto', options: { minLength: '23', maxLength: '2', pattern: 2 }, expected: 'toto' }
    ])(
      'should return [$expected] when given [$value] as value and [$options] as options.',
      ({ value, options, expected }) => {
        expect(lang.string.check(value, options)).toBe(expected);
      }
    );

    it.each([
      { value: 2, options: undefined, expected: errors.whenInvalidType() },
      { value: 'four', options: { minLength: 5 }, expected: errors.whenTooSmall(5) },
      { value: 'four', options: { maxLength: 3 }, expected: errors.whenTooBig(3) },
      { value: 'four', options: { pattern: /^[a]{4}$/i }, expected: errors.whenDontMatch(/^[a]{4}$/i) }
    ])(
      'should throw [$expected] when given [$value] as value and [$options] as options.',
      ({ value, options, expected }) => {
        expect(() => lang.string.check(value, options)).toThrow(expected);
      }
    );
  });

  describe('Check [resolve] utility.', () => {
    it.each([
      { value: 'toto', options: undefined, expected: 'toto' },
      { value: 'toto', options: {}, expected: 'toto' },
      { value: 'toto', options: { minLength: 4, maxLength: 4, pattern: /^[a-z]{4}$/i }, expected: 'toto' },
      { value: 'toto', options: { minLength: '23', maxLength: '2', pattern: 2 }, expected: 'toto' }
    ])(
      'should resolve [$expected] when given [$value] as value and [$options] as options.',
      ({ value, options, expected }) => {
        expect(lang.string.resolve(value, options)).resolves.toBe(expected);
      }
    );

    it.each([
      { value: 2, options: undefined, expected: errors.whenInvalidType() },
      { value: 'four', options: { minLength: 5 }, expected: errors.whenTooSmall(5) },
      { value: 'four', options: { maxLength: 3 }, expected: errors.whenTooBig(3) },
      { value: 'four', options: { pattern: /^[a]{4}$/i }, expected: errors.whenDontMatch(/^[a]{4}$/i) }
    ])(
      'should reject [$expected] when given [$value] as value and [$options] as options.',
      ({ value, options, expected }) => {
        expect(lang.string.resolve(value, options)).rejects.toThrow(expected);
      }
    );
  });
});
