module.exports = {
  stories: [`${__dirname}/../*.stories.js`],
  addons: [
    require.resolve('./yarn-preset.js'),
    '@storybook/addon-viewport',
    '@storybook/addon-actions'
  ],
};
