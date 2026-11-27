module.exports = {
  collectCoverageFrom: ['!jest.config.js', '!*.json'],
  modulePathIgnorePatterns: ['coverage', 'bin'],
  coveragePathIgnorePatterns: [
    '<rootDir>/test/',
    '<rootDir>/kawa.config.js',
    '<rootDir>/eslint.config.js',
    '<rootDir>/index.js'
  ],
  coverageThreshold: { global: { statements: 100 } }
};
