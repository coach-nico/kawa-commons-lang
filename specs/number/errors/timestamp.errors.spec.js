const errors = require('../../../src/number/errors/timestamp.errors');
const lang = require('../../../');

describe('Check [timestamp] error factories', () => {
  describe('Check [whenInvalidType] factory.', () => {
    it('should return an error with "The value MUST be an object." as message', () => {
      expect(errors.whenFormatInvalid()).toEqual(lang.errors.new('The value MUST have a valid date/time format.'));
    });
  });
});
