// @flow
import initStoryshots, { renderWithOptions } from '@storybook/addon-storyshots';
import { mount } from 'enzyme';

jest.mock('draft-js/lib/generateRandomKey', () => () => 'mock');

initStoryshots({
  test: renderWithOptions({
    renderer: mount,
  }),
});
