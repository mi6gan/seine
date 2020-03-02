#!/usr/bin/env node
const { relative } = require('path');

const resolveWorkspaces = require('./resolve-workspaces');
const cleanWorkspace = require('./clean-workspace');
const buildWorkspace = require('./build-workspace');

/**
 * @description Publish (yarn) workspaces.
 * @param {string[]} workspaces
 * @returns {*}
 */
async function build(workspaces) {
  workspaces = resolveWorkspaces(workspaces)
    .filter(({ entry = null }) => entry !== null)
    .map(({ context }) => relative(process.cwd(), context));
  for (const workspace of workspaces) {
    cleanWorkspace(workspace);
  }
  for (const workspace of workspaces) {
    await buildWorkspace(workspace);
  }
}

module.exports = build;

if (require.main === module) {
  build().catch((error) =>
    // eslint-disable-next-line no-console
    console.error(error)
  );
}
