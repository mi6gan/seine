const path = require('path');

module.exports = {
  typescript: {
    reactDocgen: 'react-docgen',
  },
  stories: [path.resolve(__dirname, '../src/**/*.stories.@(js|mdx)')],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-viewport',
    '@storybook/addon-actions',
    require.resolve('./yarn-preset.js'),
  ],
};
