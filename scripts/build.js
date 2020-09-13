#!/usr/bin/env node
const resolveWorkspaces = require('./resolve-workspaces');
const cleanWorkspace = require('./clean-workspace');
const buildWorkspace = require('./build-workspace');
const {
  workspace: defaultWorkspace,
  ...defaultOptions
} = require('./rollup-options');

/**
 * @description Publish (yarn) workspaces.
 * @param {string[]} workspaces
 * @param {?Array<string>} options
 * @returns {*}
 */
async function build(workspaces, options = defaultOptions) {
  workspaces = (await resolveWorkspaces(workspaces)).filter(
    ({ manifest }) => !manifest.raw.private
  );
  for (const workspace of workspaces) {
    cleanWorkspace(workspace.relativeCwd);
  }
  for (const workspace of workspaces) {
    await buildWorkspace(workspace.relativeCwd, options);
  }
}

module.exports = build;

if (require.main === module) {
  build().catch((error) =>
    // eslint-disable-next-line no-console
    console.error(error)
  );
}
