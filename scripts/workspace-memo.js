#!/usr/bin/env node
const { join, resolve } = require('path');
const { inspect } = require('util');

const { hashElement } = require('folder-hash');

const parseWorkspaces = require('./parse-workspaces');
const { workspace: defaultWorkspace } = require('./rollup-options');

/**
 * @description Get workspace memo for cache.
 * @param {string?} workspace
 * @returns {Promise<object>}
 */
async function workspaceMemo(workspace = defaultWorkspace) {
  const { packages: workspaces } = parseWorkspaces();
  const context = resolve(workspace);
  const { dependencies } = require(join(context, 'package.json'));

  const hashes = [(await hashElement(join(context, 'src'))).toString()];
  for (const [name] of Object.entries(dependencies)) {
    const subWorkspace = workspaces.find(
      (workspace) => require(join(workspace, 'package.json')).name === name
    );
    if (subWorkspace) {
      hashes.push(await workspaceMemo(subWorkspace));
    }
  }

  return { hashes, dependencies };
}

module.exports = workspaceMemo;

if (require.main === module) {
  // eslint-disable-next-line no-console
  workspaceMemo().then((memo) => console.log(inspect(memo, false, null, true)));
}
