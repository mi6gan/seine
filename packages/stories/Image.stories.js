import * as React from 'react';
import { Content } from '@seine/content';
import { Editor } from '@seine/editor';
import { actions } from '@storybook/addon-actions';

export default { title: 'Default.Single.Image' };

export const ImageContent = ({ as: Component = Content, ...props }) => (
  <Component
    {...props}
    parent={{
      id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
      type: 'page',
      body: null,
      format: null,
      parent_id: null,
    }}
  >
    {[
      {
        id: '15402f46-8545-4804-aa93-e492dbb2b1d3',
        parent_id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
        type: 'image',
        body: {
          file: 'https://foter.com/photos/394/dock-watering-natural.jpg',
        },
        format: {
          align: 'middle',
        },
      },
    ]}
  </Component>
);

export const EditorOfImageContent = () => (
  <ImageContent as={Editor} {...actions('onChange')} />
);
