const CommonError = require('./classes/common.error.class');

module.exports = {
  new: (message, cause) => new CommonError(message, cause)
};
