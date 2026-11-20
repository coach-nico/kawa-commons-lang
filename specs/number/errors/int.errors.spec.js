const errors = require('../../../src/number/errors/');
const lang = require('../../../');

describe('Check [integer] error factories', () => {
  describe('Check [whenInvalidType] factory.', () => {
    it('should return an error with "The value MUST be an integer." as message', () => {
      expect(errors.int.whenInvalidType()).toEqual(lang.errors.new('The value MUST be an integer.'));
    });
  });
});
