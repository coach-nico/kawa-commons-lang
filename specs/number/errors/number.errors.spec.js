const errors = require('../../../src/number/errors/');
const lang = require('../../../');

describe('Check [number] error factories', () => {
  describe('Check [whenTooSmall] factory.', () => {
    it.each([
      { min: 1, exclusive: true, expected: `The value MUST be greater than 1.` },
      { min: 2, exclusive: false, expected: `The value MUST be greater or equals than 2.` },
      { min: 3, exclusive: undefined, expected: `The value MUST be greater or equals than 3.` }
    ])(
      'should return an error with $expected as message when given $min as min and $exclusive as exclusive',
      ({ min, exclusive, expected }) => {
        expect(errors.number.whenTooSmall(min, exclusive)).toEqual(lang.errors.new(expected));
      }
    );
  });

  describe('Check [whenTooBig] factory.', () => {
    it.each([
      { max: 1, exclusive: true, expected: `The value MUST be smaller than 1.` },
      { max: 2, exclusive: false, expected: `The value MUST be smaller or equals than 2.` },
      { max: 3, exclusive: undefined, expected: `The value MUST be smaller or equals than 3.` }
    ])(
      'should return an error with $expected as message when given $max as max and $exclusive as exclusive',
      ({ max, exclusive, expected }) => {
        expect(errors.number.whenTooBig(max, exclusive)).toEqual(lang.errors.new(expected));
      }
    );
  });
});
