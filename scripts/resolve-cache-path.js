#!/usr/bin/env node
require('../.pnp').setup();

const crypto = require('crypto');
const { join } = require('path');
const { inspect } = require('util');

const { Workspace } = require('@yarnpkg/core');
const findCacheDir = require('find-cache-dir');

const workspaceMemo = require('./workspace-memo');
const resolveWorkspaces = require('./resolve-workspaces');

/**
 * @description Resolve workspace cache path
 * @param {Workspace} workspace
 * @param {string} name
 * @returns {Promise<{string}>}
 */
async function resolveCachePath(workspace = 'packages/core', name = '') {
  const [{ manifest }] = await resolveWorkspaces([workspace]);
  return findCacheDir({
    name: join(
      manifest.raw.name,
      crypto
        .createHash('md5')
        .update(JSON.stringify(await workspaceMemo(workspace)))
        .digest('hex'),
      name
    ),
  });
}

module.exports = resolveCachePath;

if (require.main === module) {
  resolveCachePath().then((path) =>
    // eslint-disable-next-line no-console
    console.log(inspect(path, false, null, true))
  );
}
