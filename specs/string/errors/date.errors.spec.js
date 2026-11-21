const errors = require('../../../src/string/errors/date.errors');
const lang = require('../../../');

describe('Check [date] error factories', () => {
  describe('Check [whenInvalidType] factory.', () => {
    it('should return an error with "The value MUST be a string." as message', () => {
      expect(errors.whenInvalidType()).toEqual(lang.errors.new('The value MUST be a string.'));
    });
  });

  describe('Check [whenInvalidFormat] factory.', () => {
    it('should return an error with "The value MUST have a valid date / time format." as message', () => {
      expect(errors.whenInvalidFormat()).toEqual(lang.errors.new(`The value MUST have a valid date / time format.`));
    });
  });
});
