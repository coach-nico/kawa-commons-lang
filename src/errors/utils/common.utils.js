const constants = require('../constants/common.constants');

exports.cleanMessage = message => {
  const type = typeof message;
  if (type === 'undefined') return constants.undefined;
  if (type !== 'string') return constants.notString;
  const trimmed = message.trim();
  return trimmed.length === 0 ? constants.blank : trimmed;
};

exports.cleanCause = cause => {
  if (typeof cause === 'string') {
    const trimmed = cause.trim();
    return trimmed.length === 0 ? null : new Error(trimmed);
  }
  return cause instanceof Error ? cause : null;
};
