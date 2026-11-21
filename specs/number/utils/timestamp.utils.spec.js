const lang = require('../../../');
const intErrors = require('../../../src/number/errors/int.errors');
const stringErrors = require('../../../src/string/errors/string.errors');
const errors = require('../../../src/number/errors/timestamp.errors');

const buildSample = asString => {
  return { string: asString, date: new Date(asString), timestamp: Date.parse(asString) };
};

describe('Check [timestamp] script of utilities', () => {
  const sample = buildSample('1981-10-18T23:45:00.000Z');

  describe('Check [now] utility.', () => {
    it('should return the current timestamp.', () => {
      jest.useFakeTimers().setSystemTime(sample.date);
      expect(lang.number.timestamp.now()).toBe(sample.timestamp);
    });
  });

  describe('Check [fromString] utility.', () => {
    it.each([{ expected: sample.timestamp, given: sample.string }])(
      'should return [$expected] when given [$given].',
      ({ expected, given }) => {
        expect(lang.number.timestamp.fromString(given)).toBe(expected);
      }
    );

    it.each([
      { given: undefined, expected: stringErrors.whenInvalidType() },
      { given: 'NOT-A-DATE-A-ALL', expected: errors.whenFormatInvalid() }
    ])('should reject [$expected] when given [$given].', ({ expected, given }) => {
      expect(() => lang.number.timestamp.fromString(given)).toThrow(expected);
    });
  });

  describe('Check [check] utility.', () => {
    it.each([{ given: sample.timestamp }])('should return given when given [$given].', ({ given }) => {
      expect(lang.number.timestamp.check(given)).toBe(given);
    });

    it.each([{ given: undefined, expected: intErrors.whenInvalidType() }])(
      'should throw [$expected] when given [$given].',
      ({ expected, given }) => {
        expect(() => lang.number.timestamp.check(given)).toThrow(expected);
      }
    );
  });

  describe('Check [resolve] utility.', () => {
    it.each([{ given: sample.timestamp }])('should resolve given when given [$given].', ({ given }) => {
      expect(lang.number.timestamp.resolve(given)).resolves.toBe(given);
    });

    it.each([{ given: undefined, expected: intErrors.whenInvalidType() }])(
      'should reject [$expected] when given [$given].',
      ({ expected, given }) => {
        expect(lang.number.timestamp.resolve(given)).rejects.toThrow(expected);
      }
    );
  });

  describe('Check [toISOstring] utility.', () => {
    it.each([{ expected: sample.string, given: sample.timestamp }])(
      'should return [$expected] when given [$given].',
      ({ expected, given }) => {
        expect(lang.number.timestamp.toISOString(given)).toBe(expected);
      }
    );

    it.each([{ given: undefined, expected: intErrors.whenInvalidType() }])(
      'should throw [$expected] when given [$given].',
      ({ expected, given }) => {
        expect(() => lang.number.timestamp.toISOString(given)).toThrow(expected);
      }
    );
  });
});
