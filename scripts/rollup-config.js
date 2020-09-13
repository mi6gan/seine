const { basename, dirname, resolve, join } = require('path');

const alias = require('@rollup/plugin-alias');
const { babel } = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const nodeResolve = require('@rollup/plugin-node-resolve');
const pnpResolve = require('rollup-plugin-pnp-resolve');
const json = require('@rollup/plugin-json');
const postcss = require('rollup-plugin-postcss');
const flowEntry = require('rollup-plugin-flow-entry');
const cleanup = require('rollup-plugin-cleanup');
const visualize = require('rollup-plugin-visualizer');
const { terser } = require('rollup-plugin-terser');
const camelCase = require('lodash/camelCase');

const resolveWorkspaces = require('./resolve-workspaces');
const {
  workspace: defaultWorkspace,
  ...defaultOptions
} = require('./rollup-options');

const { NODE_ENV = 'production' } = process.env;

// eslint-disable-next-line
async function rollupConfig(
  workspace = defaultWorkspace,
  { input, file, format, external } = defaultOptions
) {
  const [
    {
      cwd,
      manifest: {
        raw: { name: packageName, dependencies = {}, peerDependencies = {} },
      },
    },
  ] = await resolveWorkspaces([workspace]);

  const workspaceModuleIds = (await resolveWorkspaces())
    .map(
      ({
        manifest: {
          raw: { name: id },
        },
      }) => id
    )
    .filter((id) => id in dependencies);
  const peerModuleIds = Object.keys(peerDependencies);
  const externalModuleIds = [
    ...peerModuleIds,
    ...(format === 'umd' ? [] : workspaceModuleIds),
    ...external.split(','),
  ].filter((id) => id.trim());

  return {
    input: join(cwd, input),
    output: {
      file: join(cwd, file),
      format,
      ...(format === 'umd' && {
        name: camelCase(packageName),
        banner: `window.process = {env: {NODE_ENV: '${NODE_ENV}'}};`,
        globals: externalModuleIds.reduce(
          (acc, name) => ({
            ...acc,
            [name]: camelCase(name),
          }),
          {}
        ),
      }),
      sourcemap: !!file,
    },
    plugins: [
      ...(format === 'umd'
        ? [
            alias({
              entries: [
                {
                  find: /@seine\/(.*)/,
                  replacement: resolve('packages/$1/src'),
                },
              ],
            }),
          ]
        : []),
      visualize({
        filename: join(
          cwd,
          dirname(file),
          `${basename(file).split('.')[0]}.html`
        ),
        template: process.env.VISUALIZER_TEMPLATE,
      }),

      ...(format === 'esm' || format === 'cjs' ? [flowEntry()] : []),

      babel({
        babelHelpers: 'runtime',
        rootMode: 'upward',
      }),
      json(),
      nodeResolve({ browser: true }),
      commonjs(),
      pnpResolve(),
      postcss({ modules: true }),
      cleanup(),
      ...(format === 'umd' ? [terser()] : []),
    ],
    external: (id) =>
      id.startsWith('@seine/') ||
      externalModuleIds.some(
        (moduleId) => id === moduleId || id.startsWith(`${moduleId}/`)
      ),
  };
}

module.exports = rollupConfig;

if (require.main === module) {
  // eslint-disable-next-line no-console
  console.log(rollupConfig());
}
