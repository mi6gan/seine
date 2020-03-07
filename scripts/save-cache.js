#!/usr/bin/env node
const { mkdirSync, copyFileSync } = require('fs');
const { basename, dirname, join } = require('path');

const resolveWorkspaces = require('./resolve-workspaces');

/**
 * @description Save workspace build cache.
 * @param {string} workspace
 * @param {string} file
 * @returns {void}
 */
async function saveCache(workspace, file) {
  const [{ resolveCachePath }] = resolveWorkspaces([workspace]);
  const format = basename(dirname(file));

  const cacheDir = await resolveCachePath(format);
  mkdirSync(cacheDir, { recursive: true });
  copyFileSync(file, join(cacheDir, basename(file)));
}

module.exports = saveCache;

if (require.main === module) {
  saveCache();
}
