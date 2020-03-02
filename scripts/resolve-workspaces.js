#!/usr/bin/env node
const { join, resolve } = require('path');
const { inspect } = require('util');

const parseWorkspaces = require('./parse-workspaces');

/**
 * @description Resolve each workspaces to its context path, entry module and
 * packageJson content
 * @param {string[]} workspaces
 * @returns {Array<{context: string, entry: string, packageJson: object}>}
 */
function resolveWorkspaces(workspaces) {
  return parseWorkspaces(workspaces).packages.map((workspace) => {
    const context = resolve(workspace);
    const packageJson = require(join(context, 'package.json'));

    if (packageJson.private) {
      return { context, packageJson };
    }

    try {
      return {
        context,
        entry: require.resolve(join(context, 'src', 'index.js')),
        packageJson,
      };
    } catch (err) {
      return { context, packageJson };
    }
  });
}

module.exports = resolveWorkspaces;

if (require.main === module) {
  // eslint-disable-next-line no-console
  console.log(inspect(resolveWorkspaces(), false, null, true));
}
