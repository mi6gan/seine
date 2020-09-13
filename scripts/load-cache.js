#!/usr/bin/env node
const { copyFileSync, existsSync, mkdirSync } = require('fs');
const { basename, dirname, join } = require('path');

const resolveCachePath = require('./resolve-cache-path');

/**
 * @description Save workspace build cache.
 * @param {string} workspace
 * @param {string} file
 * @returns {boolean}
 */
async function loadCache(workspace, file) {
  const format = basename(dirname(file));

  const cachedFile = join(
    await resolveCachePath(workspace, format),
    basename(file)
  );
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
