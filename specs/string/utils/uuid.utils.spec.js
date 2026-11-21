const crypto = require('node:crypto');
const lang = require('../../../');
const constants = require('../../../src/string/constants/uuid.constants');
const errors = require('../../../src/string/errors/string.errors');

describe('Check [string] script of utilities', () => {
  const smapleV1 = 'd4778760-e417-11f1-afc9-c5c3eb87e368';
  const samplev4 = 'a14cf122-1eec-4a71-be25-d10c629f71ec';
  const sampleV4bis = '464d7b9d-e9f8-4623-be3d-c4351519f5a7';
  const samplev7 = '01a1f3dc-aa44-7519-a07c-9b42b634ea8e';
  const sampleNIL = '00000000-0000-0000-0000-000000000000';

  describe('Check [is] utility.', () => {
    it.each([
      { given: ``, expected: false },
      { given: ` `, expected: false },
      { given: sampleNIL, expected: true },
      { given: smapleV1, expected: true },
      { given: samplev4, expected: true },
      { given: samplev7, expected: true },
      { given: ` ${samplev7} `, expected: false },
      { given: 0, expected: false }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.string.uuid.is(given)).toBe(expected);
    });
  });

  describe('Check [not] utility.', () => {
    it.each([
      { given: ``, expected: true },
      { given: ` `, expected: true },
      { given: sampleNIL, expected: false },
      { given: smapleV1, expected: false },
      { given: samplev4, expected: false },
      { given: samplev7, expected: false },
      { given: ` ${samplev7} `, expected: true },
      { given: 0, expected: true }
    ])('should return [$expected] when given [$given]', ({ given, expected }) => {
      expect(lang.string.uuid.not(given)).toBe(expected);
    });
  });

  describe('Check [random] utility.', () => {
    it('should return a (randomly generated) new UUID v4', () => {
      const spyRandomUUID = jest
        .spyOn(crypto, 'randomUUID')
        .mockReturnValueOnce(samplev4)
        .mockReturnValueOnce(sampleV4bis);

      expect(lang.string.uuid.random()).toBe(samplev4);
      expect(lang.string.uuid.random()).toBe(sampleV4bis);
      expect(spyRandomUUID).toHaveBeenCalledTimes(2);
      jest.restoreAllMocks();
    });
  });

  describe('Check [check] utility.', () => {
    it('should return given when given is valid.', () => {
      expect(lang.string.uuid.check(samplev4)).toBe(samplev4);
    });

    it.each([
      { given: 2, expected: errors.whenInvalidType() },
      { given: 'not-an-UUID-at-all', expected: errors.whenDontMatch(constants.pattern) }
    ])('should throw [$expected] when given [$value] as value.', ({ given, expected }) => {
      expect(() => lang.string.uuid.check(given)).toThrow(expected);
    });
  });

  describe('Check [resolve] utility.', () => {
    it('should return given when given is valid.', () => {
      expect(lang.string.uuid.resolve(samplev4)).resolves.toBe(samplev4);
    });

    it.each([
      { given: 2, expected: errors.whenInvalidType() },
      { given: 'not-an-UUID-at-all', expected: errors.whenDontMatch(constants.pattern) }
    ])('should throw [$expected] when given [$value] as value.', ({ given, expected }) => {
      expect(lang.string.uuid.resolve(given)).rejects.toThrow(expected);
    });
  });
});
