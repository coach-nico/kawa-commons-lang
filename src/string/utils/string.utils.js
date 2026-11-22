const constants = require('../constants/string.constants');
const fn = require('../../fn');
const errors = require('../errors/string.errors');

const is = value => typeof value === constants.type;
const not = value => !is(value);
const trim = value => (is(value) ? value.trim() : '');
const length = value => (is(value) ? value.length : 0);
const isEmpty = value => length(value) === 0;
const notEmpty = value => length(value) > 0;
const isBlank = value => length(trim(value)) === 0;
const notBlank = value => length(trim(value)) > 0;

const test = (value, pattern) => {
  if (not(value)) return false;
  if (is(pattern)) return new RegExp(pattern).test(value);
  return pattern instanceof RegExp ? pattern.test(value) : true;
};

const check = (value, { minLength, maxLength, pattern } = {}) => {
  if (not(value)) throw errors.whenInvalidType();
  if (Number.isInteger(minLength) && value.length < minLength) throw errors.whenTooSmall(minLength);
  if (Number.isInteger(maxLength) && value.length > maxLength) throw errors.whenTooBig(maxLength);
  if (test(value, pattern)) return value;
  throw errors.whenDontMatch(pattern);
};

const resolve = (value, { minLength, maxLength, pattern } = {}) => {
  return fn.async(() => check(value, { minLength, maxLength, pattern }));
};

module.exports = { check, is, isBlank, isEmpty, length, not, notBlank, notEmpty, resolve, test, trim };
