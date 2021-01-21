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
  babel: async ({ plugins = [], ...options }) => ({
    ...options,
    plugins: [...plugins, ['babel-plugin-storybook-csf-title', false]],
    overrides: [
      {
        include: /\.stories\.(js|mdx)$/,
        plugins: [
          [
            'babel-plugin-storybook-csf-title',
            {
              renameDefaultExportsTo: false,
              toTitle: ({ filename }) =>
                path.relative(
                  `${__dirname}/../src`,
                  filename.replace(/\.stories\.(js|mdx)$/, '')
                ),
            },
          ],
        ],
      },
    ],
  }),
};
