const errors = require('../../errors');

module.exports = {
  whenInvalidType: () => errors.new('The value MUST be a string.'),
  whenInvalidFormat: () => errors.new(`The value MUST have a valid date / time format.`)
};
