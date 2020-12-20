// @flow
import 'draft-js/dist/Draft.css';
import './index.css';

import 'cypress-storybook/react';

export const parameters = {
  previewTabs: {
    canvas: {
      hidden: true,
    },
  },
  docs: {
    inlineStories: false,
  },
};
