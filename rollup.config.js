import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import flowEntry from 'rollup-plugin-flow-entry';
import cleanup from 'rollup-plugin-cleanup';
import { getPluginConfiguration } from '@yarnpkg/cli';
import { Configuration, Project } from '@yarnpkg/core';

const pluginConfiguration = getPluginConfiguration();

const stderr = (message) => process.stderr.write(message);

// eslint-disable-next-line
async function rollupConfig() {
  const configuration = await Configuration.find(
    process.cwd(),
    pluginConfiguration
  );
  const { project } = await Project.find(
    configuration,
    configuration.startingCwd
  );
  const workspace = project.getWorkspaceByCwd(configuration.startingCwd);

  if (!workspace.manifest.private) {
    const externalModuleIds = [
      ...[...workspace.manifest.peerDependencies].map(([_, { name }]) => name),
      ...project.workspaces
        .map(({ manifest }) => manifest.raw.name)
        .filter((id) =>
          [...workspace.manifest.dependencies].some(
            ([_, { name }]) => name === id
          )
        ),
    ];

    stderr(`building ${workspace.manifest.raw.name}`);

    return {
      input: 'src/index.js',
      output: {
        file: 'index.js',
        format: 'cjs',
        sourcemap: true,
      },
      plugins: [
        flowEntry(),
        babel({
          babelHelpers: 'runtime',
          rootMode: 'upward',
        }),
        json(),
        nodeResolve({ browser: true }),
        commonjs(),
        postcss({ modules: true }),
        cleanup(),
      ],
      external: (id) =>
        id.startsWith('@seine/') ||
        externalModuleIds.some(
          (moduleId) => id === moduleId || id.startsWith(`${moduleId}/`)
        ),
      cache: true,
    };
  }

  return [];
}

export default rollupConfig();
