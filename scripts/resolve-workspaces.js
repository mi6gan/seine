#!/usr/bin/env node
require('../.pnp').setup();

const { inspect } = require('util');

const { Configuration, Project, Workspace } = require('@yarnpkg/core');
const { getPluginConfiguration } = require('@yarnpkg/cli');

/**
 * @description Parse and normalize package (yarn) workspaces.
 * @param {Array<string>} workspacesDirs
 * @returns {Promise<Array<Workspace>>}
 */
async function resolveWorkspaces([workspace, ...workspaces] = [process.cwd()]) {
  const pluginConfiguration = getPluginConfiguration();
  const configuration = await Configuration.find(
    workspace,
    pluginConfiguration
  );
  const { project } = await Project.find(configuration, workspace);

  return [workspace, ...workspaces].map((cwd) =>
    project.getWorkspaceByCwd(cwd)
  );
}

module.exports = resolveWorkspaces;

if (require.main === module) {
  resolveWorkspaces().then((workspaces) =>
    // eslint-disable-next-line no-console
    console.log(inspect(workspaces, false, null, true))
  );
}
