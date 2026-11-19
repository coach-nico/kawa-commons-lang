const errors = require('../../../src/object/errors/object.errors');
const lang = require('../../../');

describe('Check [object] error factories', () => {
  describe('Check [whenInvalidType] factory.', () => {
    it('should return an error with "The value MUST be an object." as message', () => {
      expect(errors.whenInvalidType()).toEqual(lang.errors.new('The value MUST be an object.'));
    });
  });
});
