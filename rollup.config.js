import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import gzipPlugin from 'rollup-plugin-gzip';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';

export default [
  {
    input: 'src/index.js',
    output: [
      { file: 'dist/human-js.umd.js', format: 'umd', name: 'HumanJs' },
      {
        file: 'dist/human-js.umd.min.js',
        format: 'umd',
        name: 'HumanJs',
        sourcemap: true,
        plugins: [
          terser(),
          gzipPlugin(),
          filesize(),
        ],
      },
    ],

    plugins: [nodeResolve(), postcss({ modules: false })],
  },
  {
    input: 'src/index.js',
    output: [
      { file: 'dist/human-js.esm.js', format: 'module', name: 'HumanJs' },
      {
        file: 'dist/human-js.esm.min.js',
        format: 'module',
        name: 'HumanJs',
        sourcemap: true,
        plugins: [terser(), gzipPlugin(), filesize()],
      },
    ],

    plugins: [nodeResolve(), postcss({ modules: false })],
  },
];
