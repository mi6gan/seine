const { dirname, resolve, relative } = require('path');
const { readdirSync, unlinkSync, rmdirSync, existsSync } = require('fs');

const tc = require('colorette');

const {
  workspace: defaultWorkspace,
  ...defaultOptions
} = require('./rollup-options');

// eslint-disable-next-line no-console
const stderr = (...args) => process.stderr.write(...args);

/**
 * @description Clean rollup destination before build.
 * @param {?string} workspace
 * @param {object} options
 * @returns {void}
 */
function cleanWorkspace(
  workspace = defaultWorkspace,
  { file } = defaultOptions
) {
  const dir = resolve(workspace, dirname(file));

  if (existsSync(dir)) {
    stderr(tc.cyan(`cleaning  ${tc.bold(relative(process.cwd(), dir))}...`));
    const subDirs = [dir];

    for (const dirEntry of readdirSync(dir, { withFileTypes: true })) {
      const entryPath = resolve(dir, dirEntry.name);
      if (dirEntry.isFile()) {
        unlinkSync(entryPath);
      } else if (dirEntry.isDirectory()) {
        subDirs.push(entryPath);
      }
    }

    for (const entryPath of subDirs.sort().reverse()) {
      rmdirSync(entryPath);
    }

    stderr(tc.green(' done\n'));
  }
}

module.exports = cleanWorkspace;

if (require.main === module) {
  cleanWorkspace();
}
