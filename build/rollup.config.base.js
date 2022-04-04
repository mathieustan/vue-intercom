import path from 'path';

const {
  peerDependencies,
  version,
} = require(path.resolve(process.cwd(), 'package.json'));

const banner =
  '/*!\n' +
  ` * Vue-intercom v${version}\n` +
  ` * (c) 2019-${new Date().getFullYear()} Mathieu Stanowski\n` +
  ' */';

export default {
  input: 'src/index.js',
  output: {
    name: 'VueIntercom',
    exports: 'named',
    globals: {
      'vue': 'Vue',
    },
    banner,
  },
  watch: { include: 'src/**' },
  external: [...Object.keys(peerDependencies)],
};
