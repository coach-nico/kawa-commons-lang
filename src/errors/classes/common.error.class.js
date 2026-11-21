const utils = require('../utils/common.utils');

class CommonError extends Error {
  /**
   * @param {string} message The message.
   * @param {Error|string} cause The cause.
   * @returns {CommonError} a new common error.
   */
  constructor(message, cause) {
    super(utils.cleanMessage(message), { cause: utils.cleanCause(cause) });
  }
}

module.exports = CommonError;
