const CommonError = require('./classes/common.error.class');

module.exports = {
  new: (message, cause) => new CommonError(message, cause),
  reject: (message, cause) => Promise.reject(new CommonError(message, cause))
};
