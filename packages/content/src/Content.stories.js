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

export const PieChart = (props) => (
  <Page {...props}>
    {[
      {
        id: '63d30846-a1dc-4c50-a32a-21ca99c38bce',
        type: 'chart',
        body: {
          elements: [
            {
              title: 'repairs',
              value: 12,
              id: 'dc390594-21cb-4e6c-8c8d-c23ecf56d535',
            },
            {
              title: 'consulting of something long',
              value: 10,
              id: '363f5e90-4ce2-4983-bc74-930d80911e4e',
            },
            {
              title: 'training',
              value: 8,
              id: '53ec7a6a-66a4-4e17-95eb-d7f7fcd4a49e',
            },
            {
              title: 'product sales',
              value: 64,
              id: '4d7afb4f-ddf0-49bf-b8e6-038c60ad8783',
            },
            {
              title: 'others',
              value: 6,
              id: '8411e6cd-501f-4de6-bce1-f5f571f8272b',
            },
          ],
        },
        format: { kind: 'pie' },
        parent_id: null,
      },
    ]}
  </Page>
);

export const PieAndBarCharts = (props) => (
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
          elements: [
            {
              title: 'repairs',
              value: 12,
              id: 'dc390594-21cb-4e6c-8c8d-c23ecf56d535',
            },
            {
              title: 'consulting of something long',
              value: 10,
              id: '363f5e90-4ce2-4983-bc74-930d80911e4e',
            },
            {
              title: 'training',
              value: 8,
              id: '53ec7a6a-66a4-4e17-95eb-d7f7fcd4a49e',
            },
            {
              title: 'product sales',
              value: 64,
              id: '4d7afb4f-ddf0-49bf-b8e6-038c60ad8783',
            },
            {
              title: 'others',
              value: 6,
              id: '8411e6cd-501f-4de6-bce1-f5f571f8272b',
            },
          ],
        },
        format: { kind: 'pie' },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '01648d04-78ad-402b-b255-14a6066d7927',
        type: 'chart',
        body: {
          elements: [
            {
              title: 'WFLA',
              value: 20.8,
              id: 'c417d03c-d018-427f-8518-8c217c600e60',
            },
            {
              title: 'Region A',
              value: 35.7,
              id: '4a35a3e4-c405-4466-8b2b-d147226a1f30',
            },
            {
              title: 'Region B',
              value: 15.8,
              id: '4fc968d0-1af5-486d-9fd8-9cf29db75051',
            },
            {
              title: 'Region C',
              value: 40.9,
              id: '82fb9862-e422-4c41-9a0d-45ce30cd8d17',
            },
          ],
        },
        format: { kind: 'bar' },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
    ]}
  </Page>
);

export const ColumnAndBarCharts = (props) => (
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
          elements: [
            {
              title: 'Maelstorm',
              value: 50.1,
              id: 'b5771803-93b3-48dd-afe9-cc29bbb30729',
            },
            {
              title: 'Spring',
              value: 60.33,
              id: 'e1f309f0-ad10-4a8f-89a8-1a3bbbaf6069',
            },
            {
              title: 'Electro',
              value: 13,
              id: '7b878fef-c31c-4fe7-959a-6b0280e430a5',
            },
          ],
        },
        format: { kind: 'column' },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '01648d04-78ad-402b-b255-14a6066d7927',
        type: 'chart',
        body: {
          elements: [
            {
              title: 'WFLA',
              value: 20.8,
              id: 'd86047cb-0116-406e-854e-64a7b005f311',
            },
            {
              title: 'Region A',
              value: 35.7,
              id: 'a05de966-139d-46fe-bcc2-1e868e9b9ebf',
            },
            {
              title: 'Region B',
              value: 15.8,
              id: '2d7729af-5374-4939-8a58-0693022806ab',
            },
            {
              title: 'Region C',
              value: 40.9,
              id: '9a205b75-a8f4-428a-80cf-653f7080328d',
            },
            {
              title: 'Region D',
              value: 23.6,
              id: '0502b460-11a9-4d21-a369-5dd0efe0ee86',
            },
            {
              title: 'Region E',
              value: 17.6,
              id: '3c699bc8-c2e6-412f-b30b-475e534c9b58',
            },
            {
              title: 'Region F',
              value: 38.1,
              id: 'ce5586e1-a18d-4369-9261-3a01da529805',
            },
            {
              title: 'Region G',
              value: 43.8,
              id: '836a5c45-ed8e-4236-ab30-89062ba907a5',
            },
            {
              title: 'Region H',
              value: 16.4,
              id: 'e1941cd3-17fb-44fd-982d-b5e2acd508c9',
            },
          ],
        },
        format: { kind: 'bar' },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
    ]}
  </Page>
);

export const TwoColumnAndBarCharts = (props) => (
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
          elements: [
            {
              title: 'Maelstorm',
              value: 50.1,
              group: 'Group 1',
              id: 'd498cc41-26a1-471b-9649-3c91eca3be7c',
            },
            {
              title: 'Spring',
              value: 60.33,
              group: 'Group 1',
              id: '9a72a6a0-9705-4317-91fe-b19f1756cd83',
            },
            {
              title: 'Electro',
              value: 13,
              group: 'Group 1',
              id: 'a321c0cd-f6da-4935-94f2-a092a462fff5',
            },
            {
              title: 'Maelstorm',
              value: 90,
              group: 'Group 2',
              id: 'd498cc41-26a1-471b-9649-3c91eca3be7c',
            },
            {
              title: 'Spring',
              value: 100.22,
              group: 'Group 2',
              id: '9a72a6a0-9705-4317-91fe-b19f1756cd83',
            },
            {
              title: 'Electro',
              value: 14,
              group: 'Group 2',
              id: 'a321c0cd-f6da-4935-94f2-a092a462fff5',
            },
            {
              title: 'Maelstorm',
              value: 66,
              group: 'Group 3',
              id: 'd498cc41-26a1-471b-9649-3c91eca3be7c',
            },
            {
              title: 'Spring',
              value: 29,
              group: 'Group 3',
              id: '9a72a6a0-9705-4317-91fe-b19f1756cd83',
            },
            {
              title: 'Electro',
              value: 19,
              group: 'Group 3',
              id: 'a321c0cd-f6da-4935-94f2-a092a462fff5',
            },
            {
              title: 'Maelstorm',
              value: 30.1,
              group: 'Group 4',
              id: 'd498cc41-26a1-471b-9649-3c91eca3be7c',
            },
            {
              title: 'Spring',
              value: 8.33,
              group: 'Group 4',
              id: '9a72a6a0-9705-4317-91fe-b19f1756cd83',
            },
            {
              title: 'Electro',
              value: 100,
              group: 'Group 4',
              id: 'a321c0cd-f6da-4935-94f2-a092a462fff5',
            },
            {
              title: 'Maelstorm',
              value: 40,
              group: 'Group 5',
              id: 'd498cc41-26a1-471b-9649-3c91eca3be7c',
            },
            {
              title: 'Spring',
              value: 90.22,
              group: 'Group 5',
              id: '9a72a6a0-9705-4317-91fe-b19f1756cd83',
            },
            {
              title: 'Electro',
              value: 81,
              group: 'Group 5',
              id: 'a321c0cd-f6da-4935-94f2-a092a462fff5',
            },
            {
              title: 'Maelstorm',
              value: 100.13,
              group: 'Group 6',
              id: 'd498cc41-26a1-471b-9649-3c91eca3be7c',
            },
            {
              title: 'Spring',
              value: 73,
              group: 'Group 6',
              id: '9a72a6a0-9705-4317-91fe-b19f1756cd83',
            },
            {
              title: 'Electro',
              value: 34,
              group: 'Group 6',
              id: 'a321c0cd-f6da-4935-94f2-a092a462fff5',
            },
          ],
          title: 'Column chart: 4 groups of 3 elements',
        },
        format: { kind: 'column' },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '01648d04-78ad-402b-b255-14a6066d7927',
        type: 'chart',
        body: {
          elements: [
            {
              title: 'Region A',
              value: 35.7,
              id: 'a05de966-139d-46fe-bcc2-1e868e9b9ebf',
            },
            {
              title: 'Region B',
              value: 15.8,
              id: '2d7729af-5374-4939-8a58-0693022806ab',
            },
            {
              title: 'Region C',
              value: 40.9,
              id: '9a205b75-a8f4-428a-80cf-653f7080328d',
            },
            {
              title: 'Region D',
              value: 23.6,
              id: '0502b460-11a9-4d21-a369-5dd0efe0ee86',
            },
          ],
        },
        format: { kind: 'bar' },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
    ]}
  </Page>
);

export const LineAndBarCharts = (props) => (
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
          elements: [
            {
              title: 'Easymode',
              value: 175,
              group: 'Year 1',
              id: '9c9b23a9-1ada-4e51-b1ee-0ea077134a4a',
            },
            {
              title: 'Rest',
              value: 65,
              group: 'Year 1',
              id: '58fb3946-33bc-4515-b85c-8c0f01adee9a',
            },
            {
              title: 'Easymode',
              value: 204,
              group: 'Year 2',
              id: '9c9b23a9-1ada-4e51-b1ee-0ea077134a4a',
            },
            {
              title: 'Rest',
              value: 68,
              group: 'Year 2',
              id: '58fb3946-33bc-4515-b85c-8c0f01adee9a',
            },
            {
              title: 'Easymode',
              value: 231,
              group: 'Year 3',
              id: '9c9b23a9-1ada-4e51-b1ee-0ea077134a4a',
            },
            {
              title: 'Rest',
              value: 73,
              group: 'Year 3',
              id: '58fb3946-33bc-4515-b85c-8c0f01adee9a',
            },
            {
              title: 'Easymode',
              value: 237,
              group: 'Year 4',
              id: '9c9b23a9-1ada-4e51-b1ee-0ea077134a4a',
            },
            {
              title: 'Rest',
              value: 75,
              group: 'Year 4',
              id: '58fb3946-33bc-4515-b85c-8c0f01adee9a',
            },
            {
              title: 'Easymode',
              value: 280,
              group: 'Year 5',
              id: '9c9b23a9-1ada-4e51-b1ee-0ea077134a4a',
            },
            {
              title: 'Rest',
              value: 79,
              group: 'Year 5',
              id: '58fb3946-33bc-4515-b85c-8c0f01adee9a',
            },
            {
              title: 'Easymode',
              value: 339,
              group: 'Year 6',
              id: '9c9b23a9-1ada-4e51-b1ee-0ea077134a4a',
            },
            {
              title: 'Rest',
              value: 90,
              group: 'Year 6',
              id: '58fb3946-33bc-4515-b85c-8c0f01adee9a',
            },
          ],
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
          elements: [
            {
              title: 'WFLA',
              value: 20.8,
              id: 'd86047cb-0116-406e-854e-64a7b005f311',
            },
            {
              title: 'Region A',
              value: 35.7,
              id: 'a05de966-139d-46fe-bcc2-1e868e9b9ebf',
            },
            {
              title: 'Region B',
              value: 15.8,
              id: '2d7729af-5374-4939-8a58-0693022806ab',
            },
            {
              title: 'Region C',
              value: 40.9,
              id: '9a205b75-a8f4-428a-80cf-653f7080328d',
            },
            {
              title: 'Region D',
              value: 23.6,
              id: '0502b460-11a9-4d21-a369-5dd0efe0ee86',
            },
            {
              title: 'Region E',
              value: 17.6,
              id: '3c699bc8-c2e6-412f-b30b-475e534c9b58',
            },
            {
              title: 'Region F',
              value: 38.1,
              id: 'ce5586e1-a18d-4369-9261-3a01da529805',
            },
            {
              title: 'Region G',
              value: 43.8,
              id: '836a5c45-ed8e-4236-ab30-89062ba907a5',
            },
            {
              title: 'Region H',
              value: 16.4,
              id: 'e1941cd3-17fb-44fd-982d-b5e2acd508c9',
            },
          ],
        },
        format: { kind: 'bar' },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
    ]}
  </Page>
);

export const ColumnAndLineCharts = (props) => (
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
          elements: [
            {
              title: 'Maelstorm',
              value: 50.1,
              id: 'b5771803-93b3-48dd-afe9-cc29bbb30729',
            },
            {
              title: 'Spring',
              value: 60.33,
              id: 'e1f309f0-ad10-4a8f-89a8-1a3bbbaf6069',
            },
            {
              title: 'Electro',
              value: 13,
              id: '7b878fef-c31c-4fe7-959a-6b0280e430a5',
            },
          ],
        },
        format: { kind: 'column' },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '01648d04-78ad-402b-b255-14a6066d7927--line',
        type: 'chart',
        body: {
          elements: [
            {
              title: 'Easymode',
              value: 175,
              group: 'Year 1',
              id: '9c9b23a9-1ada-4e51-b1ee-0ea077134a4a',
            },
            {
              title: 'Rest',
              value: 65,
              group: 'Year 1',
              id: '58fb3946-33bc-4515-b85c-8c0f01adee9a',
            },
            {
              title: 'Easymode',
              value: 204,
              group: 'Year 2',
              id: '9c9b23a9-1ada-4e51-b1ee-0ea077134a4a',
            },
            {
              title: 'Rest',
              value: 68,
              group: 'Year 2',
              id: '58fb3946-33bc-4515-b85c-8c0f01adee9a',
            },
            {
              title: 'Easymode',
              value: 231,
              group: 'Year 3',
              id: '9c9b23a9-1ada-4e51-b1ee-0ea077134a4a',
            },
            {
              title: 'Rest',
              value: 73,
              group: 'Year 3',
              id: '58fb3946-33bc-4515-b85c-8c0f01adee9a',
            },
            {
              title: 'Easymode',
              value: 237,
              group: 'Year 4',
              id: '9c9b23a9-1ada-4e51-b1ee-0ea077134a4a',
            },
            {
              title: 'Rest',
              value: 75,
              group: 'Year 4',
              id: '58fb3946-33bc-4515-b85c-8c0f01adee9a',
            },
            {
              title: 'Easymode',
              value: 280,
              group: 'Year 5',
              id: '9c9b23a9-1ada-4e51-b1ee-0ea077134a4a',
            },
            {
              title: 'Rest',
              value: 79,
              group: 'Year 5',
              id: '58fb3946-33bc-4515-b85c-8c0f01adee9a',
            },
            {
              title: 'Easymode',
              value: 339,
              group: 'Year 6',
              id: '9c9b23a9-1ada-4e51-b1ee-0ea077134a4a',
            },
            {
              title: 'Rest',
              value: 90,
              group: 'Year 6',
              id: '58fb3946-33bc-4515-b85c-8c0f01adee9a',
            },
          ],

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

export const AllCharts = (props) => (
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
          elements: [
            {
              title: 'Easymode',
              value: 175,
              group: 'Year 1',
              id: '9c9b23a9-1ada-4e51-b1ee-0ea077134a4a',
            },
            {
              title: 'Rest',
              value: 65,
              group: 'Year 1',
              id: '58fb3946-33bc-4515-b85c-8c0f01adee9a',
            },
            {
              title: 'Easymode',
              value: 204,
              group: 'Year 2',
              id: '9c9b23a9-1ada-4e51-b1ee-0ea077134a4a',
            },
            {
              title: 'Rest',
              value: 68,
              group: 'Year 2',
              id: '58fb3946-33bc-4515-b85c-8c0f01adee9a',
            },
            {
              title: 'Easymode',
              value: 231,
              group: 'Year 3',
              id: '9c9b23a9-1ada-4e51-b1ee-0ea077134a4a',
            },
            {
              title: 'Rest',
              value: 73,
              group: 'Year 3',
              id: '58fb3946-33bc-4515-b85c-8c0f01adee9a',
            },
            {
              title: 'Easymode',
              value: 237,
              group: 'Year 4',
              id: '9c9b23a9-1ada-4e51-b1ee-0ea077134a4a',
            },
            {
              title: 'Rest',
              value: 75,
              group: 'Year 4',
              id: '58fb3946-33bc-4515-b85c-8c0f01adee9a',
            },
            {
              title: 'Easymode',
              value: 280,
              group: 'Year 5',
              id: '9c9b23a9-1ada-4e51-b1ee-0ea077134a4a',
            },
            {
              title: 'Rest',
              value: 79,
              group: 'Year 5',
              id: '58fb3946-33bc-4515-b85c-8c0f01adee9a',
            },
            {
              title: 'Easymode',
              value: 339,
              group: 'Year 6',
              id: '9c9b23a9-1ada-4e51-b1ee-0ea077134a4a',
            },
            {
              title: 'Rest',
              value: 90,
              group: 'Year 6',
              id: '58fb3946-33bc-4515-b85c-8c0f01adee9a',
            },
          ],
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
          elements: [
            {
              title: 'Easymode',
              value: 175,
              group: 'Year 1',
              id: '9c9b23a9-1ada-4e51-b1ee-0ea077134a4a',
            },
            {
              title: 'Rest',
              value: 65,
              group: 'Year 1',
              id: '58fb3946-33bc-4515-b85c-8c0f01adee9a',
            },
            {
              title: 'Easymode',
              value: 204,
              group: 'Year 2',
              id: '9c9b23a9-1ada-4e51-b1ee-0ea077134a4a',
            },
            {
              title: 'Rest',
              value: 68,
              group: 'Year 2',
              id: '58fb3946-33bc-4515-b85c-8c0f01adee9a',
            },
            {
              title: 'Easymode',
              value: 231,
              group: 'Year 3',
              id: '9c9b23a9-1ada-4e51-b1ee-0ea077134a4a',
            },
            {
              title: 'Rest',
              value: 73,
              group: 'Year 3',
              id: '58fb3946-33bc-4515-b85c-8c0f01adee9a',
            },
            {
              title: 'Easymode',
              value: 237,
              group: 'Year 4',
              id: '9c9b23a9-1ada-4e51-b1ee-0ea077134a4a',
            },
            {
              title: 'Rest',
              value: 75,
              group: 'Year 4',
              id: '58fb3946-33bc-4515-b85c-8c0f01adee9a',
            },
            {
              title: 'Easymode',
              value: 280,
              group: 'Year 5',
              id: '9c9b23a9-1ada-4e51-b1ee-0ea077134a4a',
            },
            {
              title: 'Rest',
              value: 79,
              group: 'Year 5',
              id: '58fb3946-33bc-4515-b85c-8c0f01adee9a',
            },
            {
              title: 'Easymode',
              value: 339,
              group: 'Year 6',
              id: '9c9b23a9-1ada-4e51-b1ee-0ea077134a4a',
            },
            {
              title: 'Rest',
              value: 90,
              group: 'Year 6',
              id: '58fb3946-33bc-4515-b85c-8c0f01adee9a',
            },
          ],
        },
        format: { kind: 'column' },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '01648d04-78ad-402b-b255-14a6066d7927',
        type: 'chart',
        body: {
          elements: [
            {
              title: 'WFLA',
              value: 20.8,
              id: 'c417d03c-d018-427f-8518-8c217c600e60',
            },
            {
              title: 'Region A',
              value: 35.7,
              id: '4a35a3e4-c405-4466-8b2b-d147226a1f30',
            },
            {
              title: 'Region B',
              value: 15.8,
              id: '4fc968d0-1af5-486d-9fd8-9cf29db75051',
            },
            {
              title: 'Region C',
              value: 40.9,
              id: '82fb9862-e422-4c41-9a0d-45ce30cd8d17',
            },
          ],
        },
        format: { kind: 'bar' },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '63d30846-a1dc-4c50-a32a-21ca99c38bce',
        type: 'chart',
        body: {
          elements: [
            {
              title: 'repairs',
              value: 12,
              id: 'dc390594-21cb-4e6c-8c8d-c23ecf56d535',
            },
            {
              title: 'consulting of something long',
              value: 10,
              id: '363f5e90-4ce2-4983-bc74-930d80911e4e',
            },
            {
              title: 'training',
              value: 8,
              id: '53ec7a6a-66a4-4e17-95eb-d7f7fcd4a49e',
            },
            {
              title: 'product sales',
              value: 64,
              id: '4d7afb4f-ddf0-49bf-b8e6-038c60ad8783',
            },
            {
              title: 'others',
              value: 6,
              id: '8411e6cd-501f-4de6-bce1-f5f571f8272b',
            },
          ],
        },
        format: { kind: 'pie' },
        parent_id: 'flex--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
    ]}
  </Page>
);

export const FirstSampleChart = (props) => (
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

export const Data = ({ as: Container = Content, children = [], ...props }) =>
  Object.entries(data).map(([key, [parent, ...children]]) => (
    <Box key={key} p={8} borderBottom={'1px dashed currentColor'}>
      <Container parent={parent} {...actions('onChange')} {...props}>
        {children}
      </Container>
    </Box>
  ));
