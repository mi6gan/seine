module.exports = {
  testPathIgnorePatterns: ['/cypress/'],
  setupFiles: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '^@seine/(.*)$': '<rootDir>/../packages/$1/src/index.js',
    'cypress-storybook/react': 'identity-obj-proxy',
    '\\.(svg|css|less)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { rootMode: 'upward' }],
    '^.+\\.mdx?$': '@storybook/addon-docs/jest-transform-mdx',
  },
};
