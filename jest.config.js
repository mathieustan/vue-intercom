module.exports = {
  verbose: false,
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  moduleFileExtensions: [
    'tsx',
    'ts',
    'js',
    'mjs',
  ],
  moduleDirectories: [
    'node_modules',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '.*\\.(j|t)sx?$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest',
  },
  testMatch: [
    // Default
    '**/*.spec.(js|ts)',
  ],
};
