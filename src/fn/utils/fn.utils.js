const constants = require('../constants/fn.constants');

const is = value => typeof value === constants.type;
const not = value => !is(value);
const resolve = value => Promise.resolve(value);
const reject = value => {
  if (value instanceof Error) return Promise.reject(value);
  return Promise.reject(new Error(typeof value === 'string' ? value : constants.unknown));
};

const async = value => {
  try {
    return resolve(is(value) ? value() : undefined);
  } catch (error) {
    return reject(error);
  }
};

module.exports = {
  is,
  not,
  resolve,
  reject,
  async
};
