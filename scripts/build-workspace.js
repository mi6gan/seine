#!/usr/bin/env node
const { readdirSync, existsSync } = require('fs');
const { dirname, resolve, join, relative } = require('path');

const rollup = require('rollup');
const tc = require('colorette');
const prettyMs = require('pretty-ms');

const rollupConfig = require('./rollup-config');
const {
  workspace: defaultWorkspace,
  ...defaultOptions
} = require('./rollup-options');

const stderr = (message) => process.stderr.write(message);

let cache;

/**
 * @description Build (yarn) workspace.
 * @param {?string} workspace
 * @param {?Array<string>} options
 * @returns {*}
 */
async function buildWorkspace(
  workspace = defaultWorkspace,
  options = defaultOptions
) {
  const cwd = resolve(workspace);
  const { format, input } = options;
  const srcDir = join(cwd, dirname(input));

  for (const dirEntry of readdirSync(srcDir, { withFileTypes: true })) {
    if (dirEntry.isDirectory()) {
      const entry = join(srcDir, dirEntry.name, 'index.js');
      if (existsSync(entry)) {
        await buildWorkspace(workspace, {
          ...options,
          input: join(
            relative(process.cwd(), dirname(input)),
            dirEntry.name,
            'index.js'
          ),
          file: join('lib', format, `${dirEntry.name}.js`),
        });
      }
    }
  }

  const { output, ...config } = rollupConfig(workspace, options);

  const start = Date.now();

  const outputInfo = tc.bold(relative(process.cwd(), output.file));
  const inputInfo = tc.bold(relative(process.cwd(), config.input));

  stderr(tc.cyan(`building ${inputInfo} → ${outputInfo}...`));

  try {
    const bundle = await rollup.rollup({ ...config, cache });
    cache = {
      modules: [
        ...(cache
          ? cache.modules.filter((current) =>
              bundle.cache.modules.every((next) => next.id !== current.id)
            )
          : []),
        ...bundle.cache.modules,
      ],
      plugins: bundle.cache.plugins,
    };
    await bundle.write(output);
    stderr(tc.green(` done in ${tc.bold(prettyMs(Date.now() - start))}.`));
    stderr('\n');
  } catch (err) {
    stderr(tc.red(` failed after ${tc.bold(prettyMs(Date.now() - start))}.`));
    stderr('\n');
    handleError(err);
  }
}

// eslint-disable-next-line jsdoc/require-jsdoc
function handleError(err, recover = false) {
  let description = err.message || err;
  if (err.name) {
    description = `${err.name}: ${description}`;
  }
  const message =
    (err.plugin ? `(plugin ${err.plugin}) ${description}` : description) || err;

  stderr(tc.red(`[!] ${tc.bold(message.toString())}`));
  stderr('\n');

  if (err.url) {
    stderr(tc.cyan(err.url));
    stderr('\n');
  }

  stderr('\n');

  if (!recover) {
    process.exit(1);
  }
}

module.exports = buildWorkspace;

if (require.main === module) {
  buildWorkspace();
}
