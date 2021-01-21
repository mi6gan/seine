// @flow
import 'draft-js/dist/Draft.css';
import './index.css';

import 'cypress-storybook/react';

export const parameters = {
  viewMode: 'story',
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  docs: {
    inlineStories: false,
  },
};
