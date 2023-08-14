module.exports = {
  ignore: [/\.d\.ts$/],
  presets: [
    '@babel/preset-typescript',
  ],
  plugins: [
    ['module-resolver', {
      root: ['.'],
      alias: {
        '@': './src',
      },
    }],
  ],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', {
          targets: { node: true },
          modules: 'commonjs',
        }],
      ],
    },
    lib: {
      ignore: ['**/__tests__'],
      plugins: [
        ['@babel/plugin-syntax-import-assertions'],
        ['babel-plugin-add-import-extension', { extension: 'mjs' }],
      ],
    },
  },
};
