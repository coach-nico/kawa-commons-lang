const errors = require('../../../src/boolean/errors/boolean.errors');
const lang = require('../../../');

describe('Check [string] error factories', () => {
  describe('Check [whenInvalidType] factory.', () => {
    it('should return an error with "The value MUST be a boolean." as message', () => {
      expect(errors.whenInvalidType()).toEqual(lang.errors.new('The value MUST be a boolean.'));
    });
  });
});
