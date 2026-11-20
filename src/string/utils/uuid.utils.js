const crypto = require('node:crypto');

const string = require('./string.utils');
const constants = require('../constants/uuid.constants');

const is = value => string.is(value) && constants.pattern.test(value);
const not = value => !is(value);
const random = () => crypto.randomUUID();

const check = value => string.check(value, { pattern: constants.pattern });
const resolve = value => string.resolve(value, { pattern: constants.pattern });

module.exports = { check, is, not, random, resolve };
