const errors = require('../errors/timestamp.errors');
const string = require('../../string');

const fromString = value => {
  const result = Date.parse(string.check(value));
  if (isNaN(result)) throw errors.whenFormatInvalid();
  return result;
};

const now = () => Date.now();

module.exports = { fromString, now };
