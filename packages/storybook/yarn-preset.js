const PnpWebpackPlugin = require(`pnp-webpack-plugin`);
const resolveWorkspaces = require('../../scripts/resolve-workspaces');

// eslint-disable-next-line
async function yarn2Config({ resolve, resolveLoader, ...config }, mode) {
  const newConfig = {
    ...config,
    resolve: {
      ...resolve,
      plugins: [...((resolve && resolve.plugins) || []), PnpWebpackPlugin],
      alias:
        mode && mode.toLowerCase() === 'development'
          ? (await resolveWorkspaces())
              .filter(({ manifest }) => manifest.module)
              .reduce(
                (acc, { manifest, cwd }) => ({
                  ...acc,
                  [manifest.raw.name]: require.resolve(`${cwd}/src/index.js`),
                }),
                resolve.alias || {}
              )
          : resolve.alias,
    },
    resolveLoader: {
      ...resolveLoader,
      plugins: [
        ...((resolveLoader && resolveLoader.plugins) || []),
        PnpWebpackPlugin.moduleLoader(module),
      ],
    },
  };
  const jsRule = newConfig.module.rules.find((rule) => rule.test.test('.js'));
  jsRule.exclude = /node_modules/;

  return newConfig;
}

module.exports = { managerWebpack: yarn2Config, webpack: yarn2Config };
