import * as React from 'react';
import { actions } from '@storybook/addon-actions';

import Content from '../content/src/Content';
import Editor from '../editor/src/Editor';

export default { title: '2 - Content' };

export const EditorOfContent = () => (
  <Editor
    {...actions('onChange')}
    parent={{
      id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
      type: 'page',
      body: null,
      format: null,
      parent_id: null,
    }}
  />
);

export const DraftContent = ({ actions, as: Component = Content }) => (
  <Component
    {...actions}
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
        type: 'draft',
        body: {
          blocks: [
            {
              key: '3ofq1',
              text:
                'This block is draft.js content. Click here to edit the text.',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: '99k9b',
              text: '',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: '3hni1',
              text: 'We are planning to add text formatting toolbar soon.',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: '5d97a',
              text: '',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: 'cgfs1',
              text:
                'Draft.js is a framework for building rich text editors in React,',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: 'pu3o',
              text:
                'powered by an immutable model and abstracting over cross-browser differences.',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
        format: { verticalAlignment: 'center' },
        parent_id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
    ]}
  </Component>
);
export const EditorOfDraftContent = () => (
  <DraftContent as={Editor} actions={actions('onChange')} />
);