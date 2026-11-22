const lang = require('../../../');
const CommonError = require('../../../src/errors/classes/common.error.class');
const utils = require('../../../src/errors/utils/common.utils');

describe('Checking [Common Error] class.', () => {
  describe('Checking constructor.', () => {
    it('should return a new instance of common error class.', () => {
      const givenMessage = 'the given message';
      const givenCause = new Error('the given cause');

      const cleanedMessage = 'the cleaned message';
      const cleanedCause = new Error('the cleaned cause');

      const spyCleanMessage = jest.spyOn(utils, 'cleanMessage').mockReturnValue(cleanedMessage);
      const spyCleanCause = jest.spyOn(utils, 'cleanCause').mockReturnValue(cleanedCause);

      const error = lang.errors.new(givenMessage, givenCause);

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(CommonError);
      expect(spyCleanMessage).toHaveBeenCalledWith(givenMessage);
      expect(error.message).toBe(cleanedMessage);
      expect(spyCleanCause).toHaveBeenCalledWith(givenCause);
      expect(error.cause).toBe(cleanedCause);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe('Checking [reject] utility.', () => {
    it('should reject a new instance of common error class.', () => {
      const cause = new Error('cause');
      expect(lang.errors.reject('m', cause)).rejects.toThrow(lang.errors.new('m', cause));
    });
  });
});
