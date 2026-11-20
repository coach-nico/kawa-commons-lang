const errors = require('../../errors');

module.exports = {
  whenInvalidType: () => errors.new('The value MUST be a string.'),
  whenTooSmall: min => errors.new(`The value MUST have, at least, ${min} caracter(s).`),
  whenTooBig: max => errors.new(`The value CANNOT have more than ${max} caracter(s).`),
  whenDontMatch: pattern => errors.new(`The value MUST match the [${pattern}] pattern.`)
};
