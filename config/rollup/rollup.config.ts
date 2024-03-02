import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

import packageJSON from '../../package.json'

import css from 'rollup-plugin-css-only'
import postcss from 'rollup-plugin-postcss'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJSON.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJSON.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: [
          './src/**/*.spec.tsx',
          './src/**/*.spec.ts',
          './src/**/*.stories.ts',
        ],
      }),
      css({ output: 'bundle.css' }),
      postcss({
        // Configure PostCSS if necessary
        // For example, to use autoprefixer:
        plugins: [require('autoprefixer')],
        // Extract CSS to a separate file
        extract: true,
        // Minify CSS
        minimize: true,
      }),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
]
