import { fileURLToPath } from 'url';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import cleanup from 'rollup-plugin-cleanup';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import builtins from 'rollup-plugin-node-builtins';

// Helpers
import external from './utils/generateExternal.mjs';

// Package
import packageJson from '../package.json' assert { type: 'json' };

const extensions = ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs'];

const BANNER =
  '/*!\n' +
  ` * Vue-intercom v${packageJson.version}\n` +
  ` * (c) 2019-${new Date().getFullYear()} Mathieu Stanowski\n` +
  ' */';

const GLOBALS = {
  'vue': 'Vue',
};

export default {
  external,
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/vue-intercom.esm.js',
      format: 'es',
      sourcemap: false,
      banner: BANNER,
    },
    {
      file: 'dist/vue-intercom.umd.js',
      name: 'VueIntercom',
      format: 'umd',
      globals: GLOBALS,
      sourcemap: false,
      banner: BANNER,
      interop: 'compat',
    },
    {
      file: 'dist/vue-intercom.min.js',
      name: 'VueIntercom',
      format: 'umd',
      globals: GLOBALS,
      plugins: [terser()],
      sourcemap: false,
      banner: BANNER,
      interop: 'compat',
    },
  ],
  plugins: [
    // -- Allow node builtins
    builtins(),
    // -- Used with resolve which allow to bundle your CommonJS dependencies in node_modules.
    commonjs({ include: /node_modules/ }),
    // -- Locate modules for using third party modules in
    nodeResolve({ extensions }),
    // -- Babel
    babel({ extensions, babelHelpers: 'inline' }),
    // -- Alias
    alias({
      entries: [
        { find: /^@\/(.*)/, replacement: fileURLToPath(new URL('../src/$1', import.meta.url)) },
      ],
    }),
    // -- Replace string dependings on environment
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __VERSION__: JSON.stringify(packageJson.version),
    }),
    // -- Remove comments, trim trailing spaces, compact empty lines, and normalize line endings in JavaScript files.
    cleanup(),
  ],
};
