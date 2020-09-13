import path from 'path';
import initStoryshots from '@storybook/addon-storyshots';
import { render } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';

initStoryshots({
  configPath: path.join(__dirname, '..', '..'),
  renderer: render,
  snapshotSerializers: [createSerializer()],
});
