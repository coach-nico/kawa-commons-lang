const errors = require('../../../src/string/errors/string.errors');
const lang = require('../../../');

describe('Check [string] error factories', () => {
  describe('Check [whenInvalidType] factory.', () => {
    it('should return an error with "The value MUST be a string." as message', () => {
      expect(errors.whenInvalidType()).toEqual(lang.errors.new('The value MUST be a string.'));
    });
  });

  describe('Check [whenTooSmall] factory.', () => {
    it.each([{ min: 5, expected: `The value MUST have, at least, 5 caracter(s).` }])(
      'should return an error with $expected as message when given $min as min',
      ({ min, expected }) => {
        expect(errors.whenTooSmall(min)).toEqual(lang.errors.new(expected));
      }
    );
  });

  describe('Check [whenTooBig] factory.', () => {
    it.each([{ max: 10, expected: `The value CANNOT have more than 10 caracter(s).` }])(
      'should return an error with $expected as message when given $max as max',
      ({ max, expected }) => {
        expect(errors.whenTooBig(max)).toEqual(lang.errors.new(expected));
      }
    );
  });

  describe('Check [whenDontMatch] factory.', () => {
    it.each([{ pattern: /^[a-z]{4}$/i, expected: `The value MUST match the [/^[a-z]{4}$/i] pattern.` }])(
      'should return an error with $expected as message when given $max as max',
      ({ pattern, expected }) => {
        expect(errors.whenDontMatch(pattern)).toEqual(lang.errors.new(expected));
      }
    );
  });
});
