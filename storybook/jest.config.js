module.exports = {
  setupFiles: ['react-app-polyfill/jsdom', '<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
};
