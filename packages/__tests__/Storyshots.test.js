import initStoryshots from '@storybook/addon-storyshots';
import * as core from '@material-ui/core';

jest.mock('@material-ui/core');
core.Popover = jest.fn().mockReturnValue(null);

initStoryshots();
