module.exports = {
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  resolver: require.resolve('jest-pnp-resolver'),
  setupFiles: [
    'react-app-polyfill/jsdom',
    '<rootDir>/.storybook/storyshots-setup.js',
  ],
  testMatch: [
    '<rootDir>/packages/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/packages/**/?(*.)(spec|test).{js,jsx,ts,tsx}',
  ],
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.stories\\.js?$': '@storybook/addon-storyshots/injectFileName',
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.css$': '<rootDir>/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/jest/fileTransform.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '^@seine/(.*)$': '<rootDir>/packages/$1/src/index.js',
    '^react-native$': 'react-native-web',
    '^.+\\.module\\.(css|sass|scss)$': require.resolve('identity-obj-proxy'),
  },
  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],
};
