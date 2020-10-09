module.exports = {
  stories: ['./src/**/*.stories.js'],
  addons: [
    require.resolve('./yarn-preset.js'),
    '@storybook/addon-actions',
    '@storybook/addon-viewport',
  ],
};
