import initStoryshots from '@storybook/addon-storyshots';
import * as core from '@material-ui/core';
import * as styles from '@seine/styles';

jest.mock('@material-ui/core');
core.Popover = jest.fn().mockReturnValue(null);

jest.mock('uuid/v4', () => jest.fn().mockReturnValue(null));

jest.mock('@seine/styles');
styles.useBreamStoryEffect = jest.fn();

initStoryshots({
  storyKindRegex: /^(?!App).+/,
});
