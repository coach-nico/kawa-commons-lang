const constants = require('../../../src/errors/constants/common.constants');
const utils = require('../../../src/errors/utils/common.utils');

describe('Checking [Common Error] script of utilities', () => {
  describe('Checking [clean message] utility function.', () => {
    it.each([
      { given: undefined, expected: constants.undefined },
      { given: 2, expected: constants.notString },
      { given: '', expected: constants.blank },
      { given: ' ', expected: constants.blank },
      { given: ' untrimmed ', expected: 'untrimmed' },
      { given: 'trimmed', expected: 'trimmed' }
    ])(`must return ["$expected"] when given [$given].`, ({ expected, given }) => {
      expect(utils.cleanMessage(given)).toBe(expected);
    });
  });

  describe('Checking [clean cause] utility function.', () => {
    const error = new Error('error');

    it.each([
      { given: undefined, expected: null },
      { given: 2, expected: null },
      { given: '', expected: null },
      { given: ' ', expected: null },
      { given: error, expected: error },
      { given: 'error', expected: error },
      { given: ' error ', expected: error }
    ])(`must return ["$expected"] when given [$given].`, ({ expected, given }) => {
      expect(utils.cleanCause(given)).toEqual(expected);
    });
  });
});
