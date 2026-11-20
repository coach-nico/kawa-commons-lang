const UNDOCUMENTED = 'This error is not (properly) documented.';

module.exports = {
  undefined: `${UNDOCUMENTED} (The given message is undefined).`,
  notString: `${UNDOCUMENTED} (The given message is not a literal string).`,
  blank: `${UNDOCUMENTED} (The given message is a blank literal string).`
};
