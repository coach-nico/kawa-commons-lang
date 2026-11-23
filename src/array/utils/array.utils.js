const is = value => Array.isArray(value);
const not = value => !is(value);
const length = value => (is(value) ? value.length : 0);
const isEmpty = value => length(value) === 0;
const notEmpty = value => !isEmpty(value);
module.exports = { is, isEmpty, length, not, notEmpty };
