const errors = require('../../errors');

module.exports = {
  whenInvalidType: () => errors.new('The value MUST be an object.')
};
