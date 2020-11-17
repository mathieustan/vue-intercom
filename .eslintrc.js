module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    // Require braces in arrow function body: disabled
    "arrow-body-style": 'off',
    // require trailing commas: always | multiline
    'comma-dangle': ['error', 'always-multiline'],
    // require return statements: disabled
    'consistent-return': 'off',
    // named function expressions: never
    'func-names': ['error', 'never'],
    // Disallow duplicate imports
    'import/prefer-default-export': 'off',
    // enforce a maximum line length: 120
    'max-len': ['warn', {
      code: 120,
      ignoreComments: true,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreTrailingComments: true,
      ignoreUrls: true,
      tabWidth: 2,
    }],
    // require constructor names to begin with a capital letter
    'new-cap': ['error', { capIsNew: false }],
    // Disallow await inside of loops: disabled
    'no-await-in-loop': 'off',
    // disallow the use of console
    'no-console': ['error', { allow: ['error', 'log', 'warn'] }],
    // disallow the use of debugger in production
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // Disallow multiple spaces
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    // disallow multiple empty lines: Max is 1 empty line
    'no-multiple-empty-lines': ['error', { max: 1 }],
    // Disallow Reassignment of Function Parameters: disabled
    'no-param-reassign': 'off',
    // Disallow Undeclared Variables
    'no-undef': 'error',
    // disallow dangling underscores: disabled
    'no-underscore-dangle': 'off',
    // Disallow Unused Variables
    'no-unused-vars': ['error', {
      vars: 'all',
      varsIgnorePattern: '^(_|_.+_)$',
      argsIgnorePattern: '^(_|_.+_)$'
    }],
    // Disallow Early Use except functions
    'no-use-before-define': ['error', { functions: false }],
    // enforce consistent linebreak style for operators: disabled
    'operator-linebreak': 'off',
    // Padding within blocks: disabled
    'padded-blocks': 'off',
    // enforce the consistent use of either backticks, double, or single quotes
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    // require semicolons: always
    semi: ['error', 'always'],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
