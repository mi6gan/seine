const PnpWebpackPlugin = require('pnp-webpack-plugin');
const { getPluginConfiguration } = require('@yarnpkg/cli');
const { Configuration, Project } = require('@yarnpkg/core');

const pluginConfiguration = getPluginConfiguration();

// eslint-disable-next-line
async function yarn2Config({ resolve, resolveLoader, ...config }) {
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
      alias: project.workspaces
        .filter(({ manifest }) => !manifest.raw.private)
        .reduce(
          (acc, { manifest, cwd }) => ({
            ...acc,
            [manifest.raw.name]: require.resolve(`${cwd}/src/index.js`),
          }),
          resolve.alias || {}
        ),
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
  if (jsRule) {
    jsRule.exclude = /node_modules/;
  }

  return newConfig;
}

module.exports = { yarn2Config };
