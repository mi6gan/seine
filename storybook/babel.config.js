const path = require('path');

const config = require('../babel.config');

module.exports = {
  ...config,
  plugins: [
    ...(config.plugins || []),
    ['babel-plugin-storybook-csf-title', false],
  ],
  overrides: [
    ...(config.overrides || []),
    {
      include: /\.stories\.(js|mdx)$/,
      plugins: [
        [
          'babel-plugin-storybook-csf-title',
          {
            renameDefaultExportsTo: false,
            toTitle: ({ filename }) =>
              path.relative(
                `${__dirname}/src`,
                filename.replace(/\.stories\.(js|mdx)$/, '')
              ),
          },
        ],
      ],
    },
  ],
};
