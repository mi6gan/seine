#!/usr/bin/env node
const { join, resolve } = require('path');
const { inspect } = require('util');

const { hashElement } = require('folder-hash');

const resolveWorkspaces = require('./resolve-workspaces');
const { workspace: defaultWorkspace } = require('./rollup-options');

/**
 * @description Get workspace memo for cache.
 * @param {string?} workspace
 * @returns {Promise<object>}
 */
async function workspaceMemo(workspace = defaultWorkspace) {
  const workspaces = await resolveWorkspaces();
  const context = resolve(workspace);
  const { dependencies } = require(join(context, 'package.json'));

  const hashes = [(await hashElement(join(context, 'src'))).toString()];
  for (const [name] of Object.entries(dependencies)) {
    const subWorkspace = workspaces.find(
      (workspace) => workspace.manifest.raw.name === name
    );
    if (subWorkspace) {
      hashes.push(await workspaceMemo(subWorkspace.cwd));
    }
  }

  return { hashes, dependencies };
}

module.exports = workspaceMemo;

if (require.main === module) {
  // eslint-disable-next-line no-console
  workspaceMemo().then((memo) => console.log(inspect(memo, false, null, true)));
}
