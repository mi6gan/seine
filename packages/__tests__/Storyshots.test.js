import initStoryshots from '@storybook/addon-storyshots';
import { render } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';

initStoryshots({
  renderer: render,
  snapshotSerializers: [createSerializer()],
});
