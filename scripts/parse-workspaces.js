#!/usr/bin/env node
const { dirname, join } = require('path');
const { inspect } = require('util');

const glob = require('glob');

const { workspaces: defaultWorkspaces = [] } = require('../package.json');

const globOptions = {
  sync: true,
  nodir: true,
};

/**
 * @description Parse and normalize package (yarn) workspaces.
 * @param {string[]} workspaces
 * @returns {{packages: string[], nohoist: string | string[]}}
 */
function parseWorkspaces(workspaces = defaultWorkspaces) {
  const { nohoist = [], packages = [] } = Array.isArray(workspaces)
    ? { packages: workspaces }
    : workspaces;
  return {
    nohoist,
    packages: packages
      .reduce(
        (acc, pattern) => [
          ...acc,
          ...glob(join(__dirname, '..', pattern, 'package.json'), globOptions),
        ],
        []
      )
      .map((packageJson) => dirname(packageJson)),
  };
}

module.exports = parseWorkspaces;

if (require.main === module) {
  // eslint-disable-next-line no-console
  console.log(inspect(parseWorkspaces(), false, null, true));
}
