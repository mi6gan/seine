const pluginTester = require('babel-plugin-tester').default;
const plugin = require('babel-plugin-macros');

pluginTester({
  plugin,
  babelOptions: {
    plugins: [require('@babel/plugin-transform-react-jsx').default],
    filename: __filename,
  },
  snapshot: true,
  tests: [
    `
      // @flow
      import { SketchPicker } from '../react-color.macro';

      const DefaultPicker = SketchPicker;

      export default () => <DefaultPicker />;
      export const Picker = () => {
        const Picker = SketchPicker;
        return <Picker />;
      }
      export { SketchPicker };
    `,
  ],
});
