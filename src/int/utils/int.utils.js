const errors = require('../errors/int.errors');
const fn = require('../../fn');

const is = value => Number.isInteger(value);

const not = value => !is(value);

const clean = (value, { min, max, dft } = {}) => {
  const clean = is(value) ? value : is(dft) ? dft : 0;
  if (is(min) && clean < min) return min;
  return is(max) && clean > max ? max : clean;
};

const check = (value, { minimum, exclusiveMinimum, maximum, exclusiveMaximum } = {}) => {
  if (not(value)) throw errors.whenInvalidType();
  if (is(minimum) && value < minimum) throw errors.whenTooSmall(minimum, false);
  if (is(exclusiveMinimum) && value <= exclusiveMinimum) throw errors.whenTooSmall(exclusiveMinimum, true);
  if (is(maximum) && value > maximum) throw errors.whenTooBig(maximum, false);
  if (is(exclusiveMaximum) && value >= exclusiveMaximum) throw errors.whenTooBig(exclusiveMaximum, true);
  return value;
};

const resolve = (value, { minimum, exclusiveMinimum, maximum, exclusiveMaximum } = {}) => {
  return fn.async(() => check(value, { minimum, exclusiveMinimum, maximum, exclusiveMaximum }));
};

module.exports = { is, not, clean, check, resolve };
