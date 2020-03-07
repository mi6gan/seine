#!/usr/bin/env node
const { copyFileSync, existsSync, mkdirSync } = require('fs');
const { basename, dirname, join } = require('path');

const resolveWorkspaces = require('./resolve-workspaces');

/**
 * @description Save workspace build cache.
 * @param {string} workspace
 * @param {string} file
 * @returns {boolean}
 */
async function loadCache(workspace, file) {
  const [{ resolveCachePath }] = resolveWorkspaces([workspace]);
  const format = basename(dirname(file));

  const cachedFile = join(await resolveCachePath(format), basename(file));
  if (existsSync(cachedFile)) {
    mkdirSync(dirname(file), { recursive: true });
    copyFileSync(cachedFile, file);
    return true;
  }
  return false;
}

module.exports = loadCache;

if (require.main === module) {
  loadCache();
}
