import * as React from 'react';
import {
  blockTypes,
  createBlockElements,
  createTitleIdentityBlockElements,
} from '@seine/core';
import { actions } from '@storybook/addon-actions';

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

        type: blockTypes.FLEX,
        body: {},
        format: {},
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

export const ContentOfPieChart = (props) => (
  <Page {...props}>
    {[
      {
        id: '63d30846-a1dc-4c50-a32a-21ca99c38bce',
        type: 'chart',
        body: {
          elements: createBlockElements([
            { title: 'repairs', value: 12 },
            { title: 'consulting of something long', value: 10 },
            { title: 'training', value: 8 },
            { title: 'product sales', value: 64 },
            { title: 'others', value: 6 },
          ]),
        },
        format: { kind: 'pie' },
        parent_id: null,
      },
    ]}
  </Page>
);

export const ContentOfPieAndBarSiblingCharts = (props) => (
  <Page {...props}>
    {[
      {
        id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
        type: 'grid',
        body: null,
        format: null,
        parent_id: null,
      },
      {
        id: '63d30846-a1dc-4c50-a32a-21ca99c38bce',
        type: 'chart',
        body: {
          elements: createBlockElements([
            { title: 'repairs', value: 12 },
            { title: 'consulting of something long', value: 10 },
            { title: 'training', value: 8 },
            { title: 'product sales', value: 64 },
            { title: 'others', value: 6 },
          ]),
        },
        format: { kind: 'pie' },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '01648d04-78ad-402b-b255-14a6066d7927',
        type: 'chart',
        body: {
          elements: createBlockElements([
            { title: 'WFLA', value: 20.8 },
            { title: 'Region A', value: 35.7 },
            { title: 'Region B', value: 15.8 },
            { title: 'Region C', value: 40.9 },
          ]),
        },
        format: { kind: 'bar' },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
    ]}
  </Page>
);

export const ContentOfColumnAndBarSiblingCharts = (props) => (
  <Page {...props}>
    {[
      {
        id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
        type: 'grid',
        body: null,
        format: null,
        parent_id: null,
      },
      {
        id: '78f5d055-8a9f-48cc-bead-f6c9e8451ced',
        type: 'chart',
        body: {
          elements: createBlockElements([
            { title: 'Maelstorm', value: 50.1 },
            { title: 'Spring', value: 60.33 },
            { title: 'Electro', value: 13 },
          ]),
        },
        format: { kind: 'column' },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '01648d04-78ad-402b-b255-14a6066d7927',
        type: 'chart',
        body: {
          elements: createBlockElements([
            { title: 'WFLA', value: 20.8 },
            { title: 'Region A', value: 35.7 },
            { title: 'Region B', value: 15.8 },
            { title: 'Region C', value: 40.9 },
            { title: 'Region D', value: 23.6 },
            { title: 'Region E', value: 17.6 },
            { title: 'Region F', value: 38.1 },
            { title: 'Region G', value: 43.8 },
            { title: 'Region H', value: 16.4 },
          ]),
        },
        format: { kind: 'bar' },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
    ]}
  </Page>
);

export const ContentOfSixGroupsOfTwoColumnsAndBarSiblingCharts = (props) => (
  <Page {...props}>
    {[
      {
        id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
        type: 'grid',
        body: null,
        format: null,
        parent_id: null,
      },
      {
        id: '78f5d055-8a9f-48cc-bead-f6c9e8451ced',
        type: 'chart',
        body: {
          elements: createTitleIdentityBlockElements([
            { title: 'Maelstorm', value: 50.1, group: 'Group 1' },
            { title: 'Spring', value: 60.33, group: 'Group 1' },
            { title: 'Electro', value: 13, group: 'Group 1' },

            { title: 'Maelstorm', value: 90, group: 'Group 2' },
            { title: 'Spring', value: 100.22, group: 'Group 2' },
            { title: 'Electro', value: 14, group: 'Group 2' },

            { title: 'Maelstorm', value: 66, group: 'Group 3' },
            { title: 'Spring', value: 29, group: 'Group 3' },
            { title: 'Electro', value: 19, group: 'Group 3' },

            { title: 'Maelstorm', value: 30.1, group: 'Group 4' },
            { title: 'Spring', value: 8.33, group: 'Group 4' },
            { title: 'Electro', value: 100, group: 'Group 4' },

            { title: 'Maelstorm', value: 40, group: 'Group 5' },
            { title: 'Spring', value: 90.22, group: 'Group 5' },
            { title: 'Electro', value: 81, group: 'Group 5' },

            { title: 'Maelstorm', value: 100.13, group: 'Group 6' },
            { title: 'Spring', value: 73, group: 'Group 6' },
            { title: 'Electro', value: 34, group: 'Group 6' },
          ]),
          title: 'Column chart: 4 groups of 3 elements',
        },
        format: { kind: 'column' },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '01648d04-78ad-402b-b255-14a6066d7927',
        type: 'chart',
        body: {
          elements: createBlockElements([
            { title: 'Region A', value: 35.7 },
            { title: 'Region B', value: 15.8 },
            { title: 'Region C', value: 40.9 },
            { title: 'Region D', value: 23.6 },
          ]),
        },
        format: { kind: 'bar' },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
    ]}
  </Page>
);

export const ContentOfLineAndBarSiblingCharts = (props) => (
  <Page {...props}>
    {[
      {
        id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
        type: 'grid',
        body: null,
        format: null,
        parent_id: null,
      },
      {
        id: '01648d04-78ad-402b-b255-14a6066d7927--line',
        type: 'chart',
        body: {
          elements: createTitleIdentityBlockElements([
            { title: 'Easymode', value: 175, group: 'Year 1' },
            { title: 'Rest', value: 65, group: 'Year 1' },

            { title: 'Easymode', value: 204, group: 'Year 2' },
            { title: 'Rest', value: 68, group: 'Year 2' },

            { title: 'Easymode', value: 231, group: 'Year 3' },
            { title: 'Rest', value: 73, group: 'Year 3' },

            { title: 'Easymode', value: 237, group: 'Year 4' },
            { title: 'Rest', value: 75, group: 'Year 4' },

            { title: 'Easymode', value: 280, group: 'Year 5' },
            { title: 'Rest', value: 79, group: 'Year 5' },

            { title: 'Easymode', value: 339, group: 'Year 6' },
            { title: 'Rest', value: 90, group: 'Year 6' },
          ]),
          title: 'Sales ($ millions)',
        },
        format: {
          dy: 40,
          kind: 'line',
          maxValue: 400,
        },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '01648d04-78ad-402b-b255-14a6066d7927',
        type: 'chart',
        body: {
          elements: createBlockElements([
            { title: 'WFLA', value: 20.8 },
            { title: 'Region A', value: 35.7 },
            { title: 'Region B', value: 15.8 },
            { title: 'Region C', value: 40.9 },
            { title: 'Region D', value: 23.6 },
            { title: 'Region E', value: 17.6 },
          ]),
        },
        format: { kind: 'bar' },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
    ]}
  </Page>
);

export const ContentOfColumnAndLineCharts = (props) => (
  <Page {...props}>
    {[
      {
        id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
        type: 'grid',
        body: null,
        format: null,
        parent_id: null,
      },
      {
        id: '78f5d055-8a9f-48cc-bead-f6c9e8451ced',
        type: 'chart',
        body: {
          elements: createBlockElements([
            { title: 'Maelstorm', value: 50.1 },
            { title: 'Spring', value: 60.33 },
            { title: 'Electro', value: 13 },
          ]),
        },
        format: { kind: 'column' },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '01648d04-78ad-402b-b255-14a6066d7927--line',
        type: 'chart',
        body: {
          elements: createTitleIdentityBlockElements([
            { title: 'Easymode', value: 175, group: 'Year 1' },
            { title: 'Rest', value: 65, group: 'Year 1' },

            { title: 'Easymode', value: 204, group: 'Year 2' },
            { title: 'Rest', value: 68, group: 'Year 2' },

            { title: 'Easymode', value: 231, group: 'Year 3' },
            { title: 'Rest', value: 73, group: 'Year 3' },

            { title: 'Easymode', value: 237, group: 'Year 4' },
            { title: 'Rest', value: 75, group: 'Year 4' },

            { title: 'Easymode', value: 280, group: 'Year 5' },
            { title: 'Rest', value: 79, group: 'Year 5' },

            { title: 'Easymode', value: 339, group: 'Year 6' },
            { title: 'Rest', value: 90, group: 'Year 6' },
          ]),
          title: 'Sales ($ millions)',
        },
        format: {
          dy: 40,
          kind: 'line',
          maxValue: 400,
        },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
    ]}
  </Page>
);

export const ContentOfAllCharts = (props) => (
  <Page {...props}>
    {[
      {
        id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
        type: 'grid',
        body: null,
        format: null,
        parent_id: null,
      },
      {
        id: '01648d04-78ad-402b-b255-14a6066d7927--line',
        type: 'chart',
        body: {
          elements: createTitleIdentityBlockElements([
            { title: 'Easymode', value: 175, group: 'Year 1' },
            { title: 'Rest', value: 65, group: 'Year 1' },

            { title: 'Easymode', value: 204, group: 'Year 2' },
            { title: 'Rest', value: 68, group: 'Year 2' },

            { title: 'Easymode', value: 231, group: 'Year 3' },
            { title: 'Rest', value: 73, group: 'Year 3' },

            { title: 'Easymode', value: 237, group: 'Year 4' },
            { title: 'Rest', value: 75, group: 'Year 4' },

            { title: 'Easymode', value: 280, group: 'Year 5' },
            { title: 'Rest', value: 79, group: 'Year 5' },

            { title: 'Easymode', value: 339, group: 'Year 6' },
            { title: 'Rest', value: 90, group: 'Year 6' },
          ]),
          title: 'Sales ($ millions)',
        },
        format: {
          dy: 40,
          kind: 'line',
          maxValue: 400,
        },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '78f5d055-8a9f-48cc-bead-f6c9e8451ced',
        type: 'chart',
        body: {
          elements: createTitleIdentityBlockElements([
            { title: 'Easymode', value: 175, group: 'Year 1' },
            { title: 'Rest', value: 65, group: 'Year 1' },

            { title: 'Easymode', value: 204, group: 'Year 2' },
            { title: 'Rest', value: 68, group: 'Year 2' },

            { title: 'Easymode', value: 231, group: 'Year 3' },
            { title: 'Rest', value: 73, group: 'Year 3' },

            { title: 'Easymode', value: 237, group: 'Year 4' },
            { title: 'Rest', value: 75, group: 'Year 4' },

            { title: 'Easymode', value: 280, group: 'Year 5' },
            { title: 'Rest', value: 79, group: 'Year 5' },

            { title: 'Easymode', value: 339, group: 'Year 6' },
            { title: 'Rest', value: 90, group: 'Year 6' },
          ]),
        },
        format: { kind: 'column' },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '01648d04-78ad-402b-b255-14a6066d7927',
        type: 'chart',
        body: {
          elements: createBlockElements([
            { title: 'WFLA', value: 20.8 },
            { title: 'Region A', value: 35.7 },
            { title: 'Region B', value: 15.8 },
            { title: 'Region C', value: 40.9 },
            { title: 'Region D', value: 23.6 },
          ]),
        },
        format: { kind: 'bar' },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '63d30846-a1dc-4c50-a32a-21ca99c38bce',
        type: 'chart',
        body: {
          elements: createBlockElements([
            { title: 'repairs', value: 12 },
            { title: 'consulting', value: 10 },
            { title: 'training', value: 8 },
            { title: 'product sales', value: 64 },
            { title: 'others', value: 6 },
          ]),
        },
        format: { kind: 'pie' },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
    ]}
  </Page>
);

export const ContentOfChartSampleOne = (props) => (
  <Page {...props}>
    {[
      {
        id: '044d4dca-4924-4a9d-9e6b-55b9be006b70',
        type: 'page',
        parent_id: null,
        body: {},
        format: {},
        schema: null,
      },
      {
        id: '6fbf9072-e107-476d-8300-642b13bf39d2',
        type: 'grid',
        parent_id: '044d4dca-4924-4a9d-9e6b-55b9be006b70',
        body: {},
        format: {},
        schema: null,
      },
      {
        id: 'cd271f11-75a5-4bff-ab2b-266f7eb4418d',
        type: 'chart',
        parent_id: '6fbf9072-e107-476d-8300-642b13bf39d2',
        body: {
          title: 'Car dealership sales in 2012 (number of cars sold)',
          elements: [
            { title: 'Luxury cars', value: 2349 },
            { title: 'SUVs', value: 6423 },
            {
              id: 'ee83f39d-03bc-4878-9c78-0edef43e936b',
              title: 'Hatchbacks',
              value: 8234,
            },
          ],
        },
        format: {
          kind: 'pie',
          units: ' ',
          palette: [
            'rgba(97,139,219,1)',
            'rgba(172,190,203,1)',
            'rgba(138,219,150,1)',
            '#e57878',
            '#8adb96',
            '#6895eb',
            '#b8c8d8',
            '#ebebeb',
            '#ff7171',
            '#fdc91d',
            '#618bdb',
            '#acbecb',
            '#707070',
          ],
        },
        schema: null,
      },
      {
        id: '7d134ef0-86d7-4de6-a689-792986b2dafc',
        type: 'chart',
        parent_id: '6fbf9072-e107-476d-8300-642b13bf39d2',
        body: {
          title: 'Car dealership sales in 2013 (number of cars sold)',
          elements: [
            { title: 'Luxury cars', value: 2584 },
            { title: 'SUVs', value: 7065 },
            {
              id: 'd2b4cd22-be07-4bb4-bc62-8b48279dee25',
              title: 'Hatchbacks',
              value: 9222,
            },
          ],
        },
        format: {
          kind: 'pie',
          units: ' ',
          palette: [
            'rgba(97,139,219,1)',
            'rgba(172,190,203,1)',
            'rgba(138,219,150,1)',
            '#e57878',
            '#8adb96',
            '#6895eb',
            '#b8c8d8',
            '#ebebeb',
            '#ff7171',
            '#fdc91d',
            '#618bdb',
            '#acbecb',
            '#707070',
          ],
        },
        schema: null,
      },
    ]}
  </Page>
);
