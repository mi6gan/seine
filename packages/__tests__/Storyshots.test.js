import path from 'path';
import initStoryshots from '@storybook/addon-storyshots';
import { render } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';

initStoryshots({
  configPath: path.resolve(__dirname, '../../.storybook'),
  renderer: render,
  snapshotSerializers: [createSerializer()],
});
