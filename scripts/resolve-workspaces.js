#!/usr/bin/env node
const { join, resolve } = require('path');
const { inspect } = require('util');
const crypto = require('crypto');

const { hashElement } = require('folder-hash');
const findCacheDir = require('find-cache-dir');

const parseWorkspaces = require('./parse-workspaces');

/**
 * @description Resolve each workspaces to its context path, entry module and
 * packageJson content
 * @param {string[]} workspaces
 * @returns {Array<{context: string, entry: string, resolveCachePath: function(string): Promise<string>, packageJson: object}>}
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
        resolveCachePath: async (name) =>
          findCacheDir({
            name: join(
              packageJson.name,
              crypto
                .createHash('md5')
                .update((await hashElement(join(context, 'src'))).toString())
                .digest('hex'),
              name
            ),
          }),
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
