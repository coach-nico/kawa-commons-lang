const fn = require('../../fn');
const string = require('./string.utils');
const errors = require('../errors/date.errors');

const not = value => isNaN(Date.parse(string.trim(value)));

const is = value => !not(value);

const check = value => {
  if (string.not(value)) throw errors.whenInvalidType();
  const trimmed = value.trim();
  if (isNaN(Date.parse(trimmed))) throw errors.whenInvalidFormat();
  return trimmed;
};

const resolve = value => fn.async(() => check(value));

const now = () => new Date().toISOString();

module.exports = { check, is, not, now, resolve };
