// @flow
import * as React from 'react';
import { actions } from '@storybook/addon-actions';
import { Content } from '@seine/content';
import { Editor } from '@seine/editor';

export default { title: 'Default.Single.Table' };

export const Table3x3 = ({
  as: Component = Content,
  children = [],
  ...props
}: any) => (
  <Component
    {...props}
    parent={{
      id: null,
      type: 'page',
      body: null,
      format: null,
      parent_id: null,
    }}
  >
    {[
      {
        id: '01648d04-78ad-402b-b255-14a6066d7927',
        type: 'table',
        body: {
          header: [
            { text: 'first column' },
            { text: 'second column' },
            { text: 'third column' },
          ],
          rows: [
            [
              { text: 'row 1, column 1' },
              { text: 'row 1, column 2' },
              { text: 'row 1, column 3' },
            ],
            [
              { text: 'row 2, column 1' },
              { text: 'row 2, column 2' },
              { text: 'row 2, column 3' },
            ],
            [
              { text: 'row 3, column 1' },
              { text: 'row 3, column 2' },
              { text: 'row 3, column 3' },
            ],
          ],
        },
        format: {},
        parent_id: null,
      },
      ...children,
    ]}
  </Component>
);

export const EditorOfTable1x2 = () => (
  <Table3x3 as={Editor} {...actions('onChange')} />
);

export const Table1x2 = ({
  as: Component = Content,
  children = [],
  ...props
}: any) => (
  <Component
    {...props}
    parent={{
      id: null,
      type: 'page',
      body: null,
      format: null,
      parent_id: null,
    }}
  >
    {[
      {
        id: '01648d04-78ad-402b-b255-14a6066d7927',
        type: 'table',
        body: {
          header: [{ text: 'narrow' }, { text: 'wider column, wider column' }],
          rows: [[{ text: 'column 1' }, { text: 'column 2' }]],
        },
        format: {},
        parent_id: null,
      },
      ...children,
    ]}
  </Component>
);
