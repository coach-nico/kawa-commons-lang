const errors = require('../../errors');

module.exports = {
  whenFormatInvalid: () => errors.new('The value MUST have a valid date/time format.')
};
