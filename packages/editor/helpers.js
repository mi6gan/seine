const { addDefault, addNamed } = require('@babel/helper-module-imports');
const { createMacro } = require('babel-plugin-macros');

module.exports = {
  createAliasMacro: helpers,
};

// eslint-disable-next-line
function helpers(moduleName, named = {}) {
  return createMacro(function importMacro({ references }) {
    for (const [exportName, paths] of Object.entries(references)) {
      const { name } =
        exportName in named
          ? addNamed(paths[0], named[exportName], moduleName)
          : addDefault(paths[0], `${moduleName}/${exportName}`);
      paths.forEach((path) => {
        path.node.name = name;
      });
    }
  });
}
