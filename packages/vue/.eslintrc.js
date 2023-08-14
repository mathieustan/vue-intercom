const OFF = 0;

module.exports = {
  parserOptions: {
    project: './packages/vue/tsconfig.dev.json',
  },
  globals: {
    __VERSION__: true,
  },
  rules: {
    'no-use-before-define': OFF,
    '@typescript-eslint/no-unused-vars': OFF,
  },
};
