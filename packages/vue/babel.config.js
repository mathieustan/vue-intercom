const package = require('./package.json');

module.exports = {
  assumptions: {
    noDocumentAll: true,
  },
  ignore: [/\.d\.ts$/],
  presets: [
    ['@babel/preset-env', {
      modules: false,
    }],
    '@babel/preset-typescript',
  ],
  plugins: [
    ['transform-define', {
      __VERSION__: package.version,
    }],
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
  },
};
