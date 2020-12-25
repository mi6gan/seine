module.exports = {
  typescript: {
    reactDocgen: 'react-docgen',
  },
  stories: [`${__dirname}/../*.stories.@(js|mdx)`],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-viewport',
    '@storybook/addon-actions',
    require.resolve('./yarn-preset.js'),
  ],
};
