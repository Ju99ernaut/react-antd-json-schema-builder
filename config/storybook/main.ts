import type { StorybookConfig } from '@storybook/core-common'
import path from 'path'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import { ResolvePluginInstance } from 'webpack'

const config: StorybookConfig = {
  stories: ['../../src/**/*.stories.mdx', '../../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-controls',
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  framework: '@storybook/react',
  core: {
    builder: {
      name: 'webpack5',
      options: {
        lazyCompilation: true,
      },
    },
  },
  features: {
    storyStoreV7: true,
  },
  webpackFinal: async config => {
    config.resolve = {
      ...config.resolve,
      plugins: [
        ...(config.resolve?.plugins || []),
        new TsconfigPathsPlugin({
          extensions: ['.ts', '.tsx'],
          configFile: path.join(__dirname, '../../tsconfig.json'),
        }) as unknown as ResolvePluginInstance,
      ],
    }

    return config
  },
}
module.exports = config
