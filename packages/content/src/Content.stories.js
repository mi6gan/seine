import * as React from 'react';
import { blockTypes, layoutTypes } from '@seine/core';
import { actions } from '@storybook/addon-actions';
import { Box } from '@material-ui/core';

import * as data from '../../core/src/data';

import Content from './Content';

export default { title: 'Content' };

export const Page = ({ as: Container = Content, children = [], ...props }) => (
  <Container
    parent={{
      id: null,
      type: blockTypes.PAGE,
      body: null,
      format: null,
      parent_id: null,
    }}
    {...props}
    {...actions('onChange')}
  >
    {children}
  </Container>
);

export const Text = (props) => (
  <Page {...props}>
    {[
      {
        id: 'text',
        parent_id: null,
        type: blockTypes.RICH_TEXT,
        body: {
          blocks: [
            {
              key: 'h1',
              text: 'Header one',
              type: 'header-one',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: 'h2',
              text: 'Header two',
              type: 'header-two',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: 'h3',
              text: 'Header three',
              type: 'header-three',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: 'h4',
              text: 'Header four',
              type: 'header-four',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: 'h5',
              text: 'Header five',
              type: 'header-five',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: 'h6',
              text: 'Header six',
              type: 'header-six',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: 'unstyled',
              text: 'This block is draft.js content.',
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
      },
    ]}
  </Page>
);

export const Table = ({ parent_id = null, ...props }) => (
  <Page {...props}>
    {[
      {
        id: 'table',
        parent_id,
        type: blockTypes.TABLE,
        body: {
          title: 'Table title',
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
      },
    ]}
  </Page>
);

export const Flex = ({ children = [], ...props }) => (
  <Page {...props}>
    {[
      {
        id: 'grid',
        parent_id: null,

        type: blockTypes.LAYOUT,
        body: {},
        format: { kind: layoutTypes.FLEX },
      },
      {
        id: 'table',
        parent_id: 'grid',
        type: blockTypes.TABLE,
        body: {
          title: 'Table title',
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
      },
      {
        id: 'text',
        parent_id: 'grid',
        type: blockTypes.RICH_TEXT,
        body: {
          blocks: [
            {
              key: 'h1',
              text: 'Header one',
              type: 'header-one',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: 'h2',
              text: 'Header two',
              type: 'header-two',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: 'h3',
              text: 'Header three',
              type: 'header-three',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: 'h4',
              text: 'Header four',
              type: 'header-four',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: 'h5',
              text: 'Header five',
              type: 'header-five',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: 'h6',
              text: 'Header six',
              type: 'header-six',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: 'unstyled',
              text: 'This block is draft.js content.',
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
      },
    ]}
  </Page>
);

export const Data = ({ as: Container = Content, children = [], ...props }) =>
  Object.entries(data).map(([key, [parent, ...children]]) => (
    <Box key={key} p={8} borderBottom={'1px dashed currentColor'}>
      <Container parent={parent} {...actions('onChange')} {...props}>
        {children}
      </Container>
    </Box>
  ));
