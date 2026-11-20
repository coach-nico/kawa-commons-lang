const errors = require('../errors/timestamp.errors');
const string = require('../../string');
const number = require('./number.utils');
const int = require('./int.utils');

const fromString = value => {
  const result = Date.parse(string.check(value));
  if (number.not(result)) throw errors.whenFormatInvalid();
  return result;
};

const now = () => Date.now();

const toISOString = value => new Date(int.check(value)).toISOString();

module.exports = { fromString, now, toISOString };
