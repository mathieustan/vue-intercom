import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { loadEnv, defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteSSR from 'vite-ssr/plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = file => path.resolve(__dirname, file);

const { version } = fs.readFileSync('./package.json', 'utf-8');

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
    root: resolve('dev'),
    server: {
      port: process.env.PORT,
      strictPort: !!process.env.PORT,
    },
    resolve: {
      alias: [
        { find: /^@mathieustan\/vue-intercom$/, replacement: resolve('./src/index.ts') },
        { find: /^@\/(.*)/, replacement: resolve('./src/$1') },
      ],
    },
    plugins: [
      vue(),
      vueJsx({ optimize: false, enableObjectSlots: true }),
      viteSSR(),
    ],
    define: {
      __VERSION__: JSON.stringify(version),
      'process.env.BABEL_TYPES_8_BREAKING': 'false',
    },
  };
});
