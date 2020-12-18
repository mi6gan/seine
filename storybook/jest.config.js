module.exports = {
  testPathIgnorePatterns: ['/cypress/'],
  setupFiles: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    'cypress-storybook/react': 'identity-obj-proxy',
    '\\.(svg|css|less)$': 'identity-obj-proxy',
  },
  transform: {
    '\\.[jt]sx?$': ['babel-jest', { rootMode: 'upward' }],
    '\\.mdx?$': '@storybook/addon-docs/jest-transform-mdx',
  },
};
