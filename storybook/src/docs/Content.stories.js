// @flow
import * as React from 'react';
import { Box } from '@material-ui/core';

import * as data from '../data';

import { blockTypes, layoutTypes, chartTypes } from '@seine/core';
import { Content } from '@seine/content';
import { ThemeProvider } from '@seine/styles';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export const Page = ({
  as: Container = Content,
  children = [],
  parent = {
    id: 'root',
    type: blockTypes.PAGE,
    body: null,
    format: null,
    parent_id: null,
  },
  ...props
}) => <Container {...props}>{[parent, ...children]}</Container>;

export const Text = (props) => (
  <Page {...props}>
    {[
      {
        id: 'text',
        parent_id: 'root',
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

export const Image = (props) => (
  <Page {...props}>
    {[
      {
        id: 'image',
        parent_id: 'root',
        type: blockTypes.IMAGE,
        body: {
          file: 'https://via.placeholder.com/150/0000FF/808080?text=Image',
        },
      },
    ]}
  </Page>
);

export const Table = ({ parent_id = 'root', ...props }) => (
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
        parent_id: 'root',

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

export const NestedFlex = ({ children = [], ...props }) => (
  <Page {...props}>
    {[
      {
        id: 'grid',
        parent_id: 'root',
        type: blockTypes.LAYOUT,
        body: {},
        format: {
          kind: layoutTypes.FLEX,
        },
      },
      {
        id: 'b3e6d581-6df8-47ee-b2cf-6cb9119edd78',
        type: blockTypes.LAYOUT,
        body: {},
        format: {
          kind: layoutTypes.FLEX,
          direction: 'column',
          wrap: 'nowrap',
          spacing: 8,
          justify: 'normal',
          alignItems: 'normal',
          alignContent: 'normal',
        },
        parent_id: 'grid',
      },
      {
        id: '27053ca8-1f37-4cf6-bb97-a51847b34dc8',
        type: blockTypes.RICH_TEXT,
        body: {
          blocks: [
            {
              key: 'bppru',
              text: 'Rich text',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
        format: {
          verticalAlignment: 'center',
        },
        parent_id: 'b3e6d581-6df8-47ee-b2cf-6cb9119edd78',
      },
      {
        id: 'table',
        parent_id: 'b3e6d581-6df8-47ee-b2cf-6cb9119edd78',
        type: blockTypes.TABLE,
        body: {
          title: 'Table title',
          header: [
            {
              text: 'first column',
            },
            {
              text: 'second column',
            },
            {
              text: 'third column',
            },
          ],
          rows: [
            [
              {
                text: 'row 1, column 1',
              },
              {
                text: 'row 1, column 2',
              },
              {
                text: 'row 1, column 3',
              },
            ],
            [
              {
                text: 'row 2, column 1',
              },
              {
                text: 'row 2, column 2',
              },
              {
                text: 'row 2, column 3',
              },
            ],
            [
              {
                text: 'row 3, column 1',
              },
              {
                text: 'row 3, column 2',
              },
              {
                text: 'row 3, column 3',
              },
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
        format: {
          verticalAlignment: 'center',
        },
      },
    ]}
  </Page>
);

export const PieChart = ({ children = [], ...props }) => (
  <Page {...props}>
    {[
      {
        id: '63d30846-a1dc-4c50-a32a-21ca99c38bce',
        parent_id: 'root',
        type: blockTypes.CHART,
        body: {
          elements: [
            {
              title:
                'There is no space at the top. But big slices have enough space to contain text inside',
              value: 64,
              id: '0aa5ad65-9337-4bd6-99be-2e1fdff9e6de',
            },
            {
              title: 'repairs of something very long',
              value: 12,
              id: '19f01bde-c75e-47fa-9571-a0a0bab03971',
            },
            {
              title: 'consulting',
              value: 10,
              id: 'c72d4fcb-71c2-49f2-8a78-e7d26c18b474',
            },
            {
              title: 'training',
              value: 8,
              id: '737ff7d8-22ae-4e06-993c-b3a57d8f4234',
            },
            {
              title: 'others',
              value: 6,
              id: 'a7e1f2d4-6c76-4247-937b-aaeb32f97b3b',
            },
          ],
        },
        format: { kind: chartTypes.PIE },
      },
    ]}
  </Page>
);

export const ColumnChart = ({ children = [], ...props }) => (
  <Page {...props}>
    {[
      {
        id: '63d30846-a1dc-4c50-a32a-21ca99c38bce',
        parent_id: 'root',
        type: blockTypes.CHART,
        body: {
          elements: [
            {
              id: '8235cdd7-2f4b-4f7b-8208-1500a8826816',
              title: 'Maelstorm',
              value: 50.1,
            },
            {
              id: '524fd9d7-047c-441e-9d61-fee72abcbe35',
              title: 'Spring',
              value: 60.33,
            },
            {
              id: 'empty',
              title: 'Empty',
              value: 0,
            },
            {
              id: '23ec0b37-6da2-434c-8484-818f753deb63',
              title: 'Electro',
              value: 13,
            },
          ],
        },
        format: { kind: chartTypes.COLUMN },
      },
    ]}
  </Page>
);

export const BarChart = ({ children = [], ...props }) => (
  <Page {...props}>
    {[
      {
        id: '63d30846-a1dc-4c50-a32a-21ca99c38bce',
        parent_id: 'root',
        type: blockTypes.CHART,
        body: {
          elements: [
            {
              title: 'WFLA',
              value: 20.8,
              id: '3d7ace6b-2eef-4bf7-a534-f794323be5b2',
            },
            {
              title: 'Region A',
              value: 35.7,
              id: '8df0406e-473d-4956-a8d4-1e9c42c45cbf',
            },
            {
              title: 'Region B',
              value: 15.8,
              id: 'e80e6d00-1e34-43b1-8b11-67a44bca921a',
            },
            {
              title: 'Region C',
              value: 40.9,
              id: '23ec0b37-6da2-434c-8484-818f753deb63',
            },
            {
              title: 'Region D',
              value: 23.6,
              id: '524fd9d7-047c-441e-9d61-fee72abcbe35',
            },
            {
              title: 'Region E',
              value: 17.6,
              id: '8235cdd7-2f4b-4f7b-8208-1500a8826816',
            },
            {
              title: 'Region F',
              value: 38.1,
              id: '745f78c0-7a74-4984-aefe-e2e0c5b86c27',
            },
            {
              title: 'Region G',
              value: 43.8,
              id: '8a4b2ae0-0f2d-45b1-9d22-9444f7e16cee',
            },
            {
              title: 'Region H',
              value: 16.4,
              id: '85c7aeb7-ea55-44ad-bf96-13fe9c833583',
            },
          ],
        },
        format: { kind: chartTypes.BAR },
      },
    ]}
  </Page>
);

export const LineChart = ({ children = [], ...props }) => (
  <Page {...props}>
    {[
      {
        id: '63d30846-a1dc-4c50-a32a-21ca99c38bce',
        parent_id: 'root',
        type: blockTypes.CHART,
        body: {
          elements: [
            { title: 'Easymode', value: 1750, group: 'Year 1' },
            { title: 'Rest', value: 650, group: 'Year 1' },

            { title: 'Easymode', value: 2040, group: 'Year 2' },
            { title: 'Rest', value: 680, group: 'Year 2' },

            { title: 'Easymode', value: 2310, group: 'Year 3' },
            { title: 'Rest', value: 730, group: 'Year 3' },

            { title: 'Easymode', value: 2370, group: 'Year 4' },
            { title: 'Rest', value: 750, group: 'Year 4' },

            { title: 'Easymode', value: 2800, group: 'Year 5' },
            { title: 'Rest', value: 790, group: 'Year 5' },

            { title: 'Easymode', value: 3390, group: 'Year 6' },
            { title: 'Rest', value: 900, group: 'Year 6' },
          ],
        },
        format: { kind: chartTypes.LINE },
      },
    ]}
  </Page>
);

export const Data = ({ as: Container = Content, children = [], ...props }) =>
  Object.entries(data).map(([key, blocks]) => (
    <Box key={key} p={8} borderBottom={'1px dashed currentColor'}>
      <Container {...props}>{blocks}</Container>
    </Box>
  ));

export const DataV03 = ({ as: Container = Content, children = [], ...props }) =>
  Object.entries(data).map(([key, blocks]) => (
    <Box key={key} p={8} borderBottom={'1px dashed currentColor'}>
      <Container {...props}>
        {blocks.map(({ format, ...block }) => ({
          ...block,
          format: { ...format, version: '0.3' },
        }))}
      </Container>
    </Box>
  ));
