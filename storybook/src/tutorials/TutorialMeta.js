// @flow
import * as React from 'react';
import { Meta } from '@storybook/addon-docs/blocks';

// eslint-disable-next-line
export default function TutorialMeta({ parameters, ...props }) {
  return (
    <Meta
      {...props}
      parameters={{
        ...parameters,
        viewMode: 'docs',
        previewTabs: {
          canvas: {
            hidden: true,
          },
          'storybook/docs/panel': {
            hidden: false,
          },
        },
      }}
    />
  );
}
