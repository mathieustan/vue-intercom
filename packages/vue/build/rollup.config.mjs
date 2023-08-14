import analyze from 'rollup-plugin-analyzer';
import visualizer from 'rollup-plugin-visualizer';

import configBase from './rollup.config.base.mjs';

export default (commandLineArgs) => {
  return Object.assign({}, configBase, {
    plugins: [
      ...configBase.plugins,
      ...(commandLineArgs.analyze ? [analyze({ summaryOnly: true })] : []),
      ...(commandLineArgs.visualizer ? [visualizer()] : []),
    ],
  });
};
