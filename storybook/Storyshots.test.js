// @flow
import initStoryshots from '@storybook/addon-storyshots';
import { createSerializer } from 'enzyme-to-json';
import { render } from 'enzyme';

jest.mock('draft-js/lib/generateRandomKey', () => () => 'mock');

initStoryshots({
  renderer: render,
  snapshotSerializers: [createSerializer()],
});
