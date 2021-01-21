// @flow
import initStoryshots from '@storybook/addon-storyshots';
import { mount } from 'enzyme';

jest.mock('draft-js/lib/generateRandomKey', () => () => 'mock');

initStoryshots({
  renderer: mount,
});
