const errors = require('../../errors');

module.exports = {
  whenInvalidType: () => errors.new('The value MUST be a number.'),
  whenTooSmall: (min, exclusive) => {
    return Boolean(exclusive)
      ? errors.new(`The value MUST be greater than ${min}.`)
      : errors.new(`The value MUST be greater or equals than ${min}.`);
  },
  whenTooBig: (max, exclusive) => {
    return Boolean(exclusive)
      ? errors.new(`The value MUST be smaller than ${max}.`)
      : errors.new(`The value MUST be smaller or equals than ${max}.`);
  }
};
