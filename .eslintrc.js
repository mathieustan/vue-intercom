const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
    extraFileExtensions: ['.vue'],
  },
  extends: [
    'standard',
    'plugin:vue/vue3-recommended',
  ],
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'arrow-body-style': OFF,
    'comma-dangle': [ERROR, 'always-multiline'],
    'consistent-return': OFF,
    'func-call-spacing': OFF,
    'func-names': OFF,
    'import/no-named-default': OFF,
    'import/prefer-default-export': OFF,
    'max-len': ['warn', { code: 120, ignoreComments: true, ignoreRegExpLiterals: true, ignoreStrings: true, ignoreTemplateLiterals: true, ignoreTrailingComments: true, ignoreUrls: true, tabWidth: 2 }],
    'multiline-ternary': OFF,
    'new-cap': [ERROR, { capIsNew: false }],
    'no-await-in-loop': OFF,
    'no-case-declarations': OFF,
    'no-console': [ERROR, { allow: ['error', 'log', 'warn'] }],
    'no-debugger': process.env.NODE_ENV === 'production' ? WARN : OFF,
    'no-multi-spaces': [ERROR, { ignoreEOLComments: true }],
    'no-multiple-empty-lines': [ERROR, { max: 1 }],
    'no-param-reassign': OFF,
    'no-prototype-builtins': OFF,
    'no-undef': ERROR,
    'no-underscore-dangle': OFF,
    'no-unused-vars': [ERROR, { vars: 'all', argsIgnorePattern: '^_' }],
    'no-use-before-define': [ERROR, { functions: false }],
    'no-void': OFF,
    'operator-linebreak': OFF,
    'padded-blocks': OFF,
    'quote-props': OFF,
    'quotes': [ERROR, 'single', { allowTemplateLiterals: true }],
    'semi': [ERROR, 'always'],
    // Specific to vue
    'vue/multi-word-component-names': OFF,
    'vue/no-reserved-component-names': OFF,
    'vue/no-useless-template-attributes': OFF,
    'vue/no-v-text-v-html-on-component': OFF,
    'vue/one-component-per-file': OFF,
    'vue/require-default-prop': OFF,
    'vue/valid-next-tick': OFF,
    'vue/max-attributes-per-line': [WARN, {
      'singleline': { 'max': 3 },
      'multiline': { 'max': 1 },
    }],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.d.ts'],
      extends: [
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': OFF,
        '@typescript-eslint/ban-ts-comment': OFF,
        '@typescript-eslint/ban-types': OFF,
        '@typescript-eslint/no-empty-function': OFF,
        '@typescript-eslint/no-empty-interface': OFF,
        '@typescript-eslint/no-namespace': OFF,
        '@typescript-eslint/no-non-null-assertion': OFF,
        '@typescript-eslint/no-this-alias': OFF,
        '@typescript-eslint/no-unnecessary-type-constraint': WARN,
        '@typescript-eslint/no-unused-vars': [ERROR, { vars: 'all', varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-var-requires': OFF,
        '@typescript-eslint/consistent-type-imports': [ERROR, {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        }],
        'import/consistent-type-specifier-style': [ERROR, 'prefer-top-level'],
        'import/no-duplicates': [ERROR, { 'prefer-inline': false }],
      },
    },
    {
      files: '**/*.d.ts',
      rules: {
        'import/no-duplicates': OFF,
        'no-unused-vars': OFF,
      },
    },
  ],
};
