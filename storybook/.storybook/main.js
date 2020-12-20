module.exports = {
  typescript: {
    reactDocgen: 'react-docgen',
  },
  stories: [`${__dirname}/../*.stories.@(js|mdx)`],
  addons: [
    require.resolve('./yarn-preset.js'),
    '@storybook/addon-viewport',
    '@storybook/addon-actions',
    '@storybook/addon-docs',
  ],
};
