// @flow
import initStoryShots from '@storybook/addon-storyshots';
import { mount } from 'enzyme';

jest.mock('draft-js/lib/generateRandomKey', () => () => 'mock');

initStoryShots({
  renderer: mount,
});
