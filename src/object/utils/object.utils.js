const constants = require('../constants/object.constants');
const errors = require('../errors/object.errors');
const fn = require('../../fn');

const is = value => typeof value == constants.type;
const not = value => !is(value);
const getClass = value => (is(value) ? value.constructor : null);
const getClassName = value => (is(value) ? value.constructor.name : null);

const check = (value, {} = {}) => {
  if (not(value)) throw errors.whenInvalidType();
  return value;
};

const resolve = (value, {} = {}) => {
  return fn.async(() => check(value));
};

module.exports = { is, not, check, getClass, getClassName, resolve };
