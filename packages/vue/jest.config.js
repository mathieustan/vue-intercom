const base = require('../../jest.config');

module.exports = {
  ...base,
  collectCoverageFrom: [
    'src/*.{js,ts,tsx}',
    '!**/*.d.ts',
  ],
};
