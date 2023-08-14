import fg from 'fast-glob';
import mm from 'micromatch';
import MagicString from 'magic-string';
import { fileURLToPath } from 'url';

import dts from 'rollup-plugin-dts';
import alias from '@rollup/plugin-alias';

function createTypesConfig (input, output, renderChunk, filter) {
  input = 'types-temp/' + input;
  let files = fg.sync(input);

  if (filter) files = filter(files);

  return files.map(file => {
    const outputFile = output.replace('*', mm.capture(input, file)[0]);
    return {
      input: file,
      output: [{ file: outputFile, format: 'es', sourcemap: false }],
      plugins: [
        dts(),
        alias({
          entries: [
            { find: /^@\/(.*)/, replacement: fileURLToPath(new URL('../types-temp/$1', import.meta.url)) },
          ],
        }),
        {
          async renderChunk (code) {
            code = new MagicString(code);

            if (renderChunk) await renderChunk(code);

            return {
              code: code.toString(),
              map: null,
            };
          },
        },
        // sourcemaps(),
      ],
    };
  });
}

export default [
  createTypesConfig('index.d.ts', 'lib/index.d.mts'),
  createTypesConfig('index.d.ts', 'dist/vue-intercom.d.ts'),
].flat();
