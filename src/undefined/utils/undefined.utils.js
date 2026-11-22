const constants = require('../constants/undefined.constants');

const is = value => typeof value === constants.type;
const not = value => !is(value);

module.exports = { is, not };
