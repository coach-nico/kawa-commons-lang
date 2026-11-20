const lang = require('../../../');
const stringErrors = require('../../../src/string/errors/string.errors');
const errors = require('../../../src/time/errors/timestamp.errors');

const buildSample = asString => {
  return { string: asString, date: new Date(asString), timestamp: Date.parse(asString) };
};

describe('Check [timestamp] script of utilities', () => {
  describe('Check [now] utility.', () => {
    const sample = buildSample('1981-10-19T00:45:00.000+01:00');

    it('should return the current timestamp.', () => {
      jest.useFakeTimers().setSystemTime(sample.date);
      expect(lang.time.now()).toBe(sample.timestamp);
    });
  });

  describe('Check [fromString] utility.', () => {
    const sample = buildSample('1981-10-19T00:45:00.000+01:00');

    it.each([{ expected: sample.timestamp, given: sample.string }])(
      'should return [$expected] when given [$given].',
      ({ expected, given }) => {
        expect(lang.time.fromString(given)).toBe(expected);
      }
    );

    it.each([
      { given: undefined, expected: stringErrors.whenInvalidType() },
      { given: 'NOT-A-DATE-A-ALL', expected: errors.whenFormatInvalid() }
    ])('should reject [$expected] when given [$given].', ({ expected, given }) => {
      expect(() => lang.time.fromString(given)).toThrow(expected);
    });
  });
});
