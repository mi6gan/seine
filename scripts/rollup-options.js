const { join } = require('path');

const { commandAliases } = require('rollup/dist/shared');
const minimist = require('minimist');

if (!('NODE_ENV' in process.env)) {
  process.env['NODE_ENV'] = 'production';
}

const {
  format,
  name,
  input = join('src', `${name}.js`),
  file = join('lib', format, `${name}.js`),
  ...options
} = minimist(process.argv.slice(2), {
  alias: commandAliases,
  default: {
    external: '',
    format: 'esm',
    name: 'index',
    workspace: 'packages/core',
  },
});

module.exports = { ...options, format, name, input, file };

if (require.main === module) {
  // eslint-disable-next-line no-console
  console.log(module.exports);
}
