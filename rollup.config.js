import fs from 'fs';
import path from 'path';

import { babel } from '@rollup/plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import flowEntry from 'rollup-plugin-flow-entry';
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

  const externalModuleIds = [
    ...Object.keys(workspace.manifest.raw.peerDependencies || {}),
    ...project.workspaces
      .map(({ manifest }) => manifest.raw.name)
      .filter((id) =>
        Object.keys(workspace.manifest.raw.dependencies).some(
          (name) => name === id
        )
      ),
  ];

  const dir = await fs.promises.opendir(workspace.cwd);
  for await (const entry of dir) {
    if (entry.isFile() && /^index\..+$/.test(entry.name)) {
      await fs.promises.unlink(path.resolve(workspace.cwd, entry.name));
    }
  }

  stderr(`building ${workspace.manifest.raw.name}`);

  return {
    input: 'src/index.js',
    output: [
      {
        file: 'index.cjs.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'index.es.js',
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      flowEntry(),
      babel({
        babelHelpers: 'runtime',
        rootMode: 'upward',
      }),
      nodeResolve({
        browser: true,
        preferBuiltins: true,
      }),
      builtins({ crypto: false }),
      commonjs(),
    ],

    external: (id) =>
      id.startsWith('@seine/') ||
      externalModuleIds.some(
        (moduleId) => id === moduleId || id.startsWith(`${moduleId}/`)
      ),
  };
}

export default rollupConfig();
