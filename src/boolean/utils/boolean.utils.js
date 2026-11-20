const errors = require('../errors/boolean.errors');
const fn = require('../../fn');
const constants = require('../constants/boolean.constants');

const is = value => typeof value === constants.type;

const not = value => !is(value);

const clean = (value, { dft } = {}) => (is(value) ? value : is(dft) ? dft : false);

const check = value => {
  if (not(value)) throw errors.whenInvalidType();
  return value;
};

const resolve = value => fn.async(() => check(value));

const from = value => value === constants.trueAsString || value === true || (Number.isInteger(value) && value !== 0);

module.exports = { check, clean, from, is, not, resolve };
