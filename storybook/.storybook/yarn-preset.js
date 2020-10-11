const PnpWebpackPlugin = require('pnp-webpack-plugin');
const { getPluginConfiguration } = require('@yarnpkg/cli');
const { Configuration, Project } = require('@yarnpkg/core');

const pluginConfiguration = getPluginConfiguration();

// eslint-disable-next-line
async function yarn2Config({ resolve, resolveLoader, ...config }, mode) {
  const configuration = await Configuration.find(
    __dirname,
    pluginConfiguration
  );
  const { project } = await Project.find(
    configuration,
    configuration.startingCwd
  );

  const newConfig = {
    ...config,
    resolve: {
      ...resolve,
      extensions: ['.mjs', '.js', '.json'],
      plugins: [...((resolve && resolve.plugins) || []), PnpWebpackPlugin],
      alias:
        mode.configType.toLowerCase() === 'development'
          ? project.workspaces
              .filter(({ manifest }) => !manifest.raw.private)
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
  const jsRule = newConfig.module.rules.find(
    (rule) => rule.test.test('.js') || rule.test.test('.mjs')
  );
  jsRule.exclude = /node_modules/;

  return newConfig;
}

module.exports = { managerWebpack: yarn2Config, webpack: yarn2Config };
