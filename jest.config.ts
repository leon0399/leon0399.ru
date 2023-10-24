import type { Config } from '@jest/types'
import nextJest from 'next/jest'

const babelConfigEmotion = {
  presets: [
    [
      'next/babel',
      {
        'preset-react': {
          runtime: 'automatic',
          importSource: '@emotion/react',
        },
      },
    ],
  ],
  plugins: [
    require.resolve('@emotion/babel-plugin'),
    require.resolve('babel-plugin-twin'),
    require.resolve('babel-plugin-macros'),
  ],
}

const customJestConfig: Config.InitialOptions = {
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testPathIgnorePatterns: ['<rootDir>/e2e'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  moduleNameMapper: {
    '@vercel/analytics': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': ['babel-jest', babelConfigEmotion],
  },
}

const createJestConfig = nextJest({ dir: './' })(customJestConfig)

export default createJestConfig
