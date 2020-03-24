import * as React from 'react';
import { actions } from '@storybook/addon-actions';
import {
  createBlockElements,
  createTitleIdentityBlockElements,
} from '@seine/core';
import { Content } from '@seine/content';
import { Editor } from '@seine/editor';
import { ChartLayout, ChartLegend, defaultChartPalette } from '@seine/charts';
import { defaultTheme, ThemeProvider } from '@seine/styles';

export default { title: 'Default.Single.Chart' };

export const DummyChartLayout = () => (
  <ThemeProvider theme={defaultTheme}>
    <ChartLayout
      title={'Chart layout'}
      description={
        <ChartLegend
          elements={[{ title: 'Element #1' }, { title: 'Element #2' }]}
          palette={defaultChartPalette}
          size={15}
        />
      }
    >
      <p>Content of the chart</p>
    </ChartLayout>
  </ThemeProvider>
);

export const BarChart = ({
  as: Component = Content,
  body = {
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
  format = {},
  children = [],
  ...props
}) => (
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
        type: 'chart',
        body,
        format: { ...format, kind: 'bar' },
        parent_id: null,
      },
      ...children,
    ]}
  </Component>
);

export const EditorOfBarChart = (props) => (
  <BarChart as={Editor} {...actions('onChange')} {...props} />
);

export const ColumnChart = ({
  as: Component = Content,
  children = [],
  ...props
}) => (
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
        parent_id: null,
      },
      ...children,
    ]}
  </Component>
);
export const EditorOfColumnChart = () => (
  <ColumnChart as={Editor} {...actions('onChange')} />
);

export const TwoGroupsOfTwoColumns = ({
  as: Component = Content,
  children = [],
  ...props
}) => (
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
        id: '78f5d055-8a9f-48cc-bead-f6c9e8451ced',
        type: 'chart',
        body: {
          elements: createTitleIdentityBlockElements([
            { title: 'Maelstorm', value: 50.1, group: 'Group 1' },
            { title: 'Spring', value: 60.33, group: 'Group 1' },

            { title: 'Maelstorm', value: 90, group: 'Group 2' },
            { title: 'Spring', value: 100.22, group: 'Group 2' },
          ]),
          title: 'Column chart: 2 groups, 2 elements',
        },
        format: { kind: 'column' },
        parent_id: null,
      },
      ...children,
    ]}
  </Component>
);
export const EditorOfTwoGroupsOfTwoColumns = () => (
  <TwoGroupsOfTwoColumns as={Editor} {...actions('onChange')} />
);

export const ThreeGroupsOfThreeColumns = ({
  as: Component = Content,
  children = [],
  ...props
}) => (
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
        id: '78f5d055-8a9f-48cc-bead-f6c9e8451ced',
        type: 'chart',
        body: {
          elements: createTitleIdentityBlockElements([
            { title: 'Maelstorm', value: 50.1, group: 'Group 1' },
            { title: 'Spring', value: 60.33, group: 'Group 1' },
            { title: 'Others', value: 35, group: 'Group 1' },

            { title: 'Maelstorm', value: 90, group: 'Group 2' },
            { title: 'Spring', value: 100.22, group: 'Group 2' },
            { title: 'Others', value: 75, group: 'Group 2' },

            { title: 'Maelstorm', value: 90, group: 'Group 3' },
            { title: 'Spring', value: 100.22, group: 'Group 3' },
            { title: 'Others', value: 75, group: 'Group 3' },
          ]),
          title: 'Column chart: 3 groups, 3 elements',
        },
        format: { kind: 'column' },
        parent_id: null,
      },
      ...children,
    ]}
  </Component>
);
export const EditorOfThreeGroupsOfThreeColumns = () => (
  <ThreeGroupsOfThreeColumns as={Editor} {...actions('onChange')} />
);

export const ThreeGroupsOfFourColumns = ({
  as: Component = Content,
  children = [],
  ...props
}) => (
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
        id: '78f5d055-8a9f-48cc-bead-f6c9e8451ced',
        type: 'chart',
        body: {
          elements: createTitleIdentityBlockElements([
            { title: 'Maelstorm', value: 50.1, group: 'Group 1' },
            { title: 'Spring', value: 60.33, group: 'Group 1' },
            { title: 'Generic', value: 75, group: 'Group 1' },
            { title: 'Others', value: 35, group: 'Group 1' },

            { title: 'Maelstorm', value: 90, group: 'Group 2' },
            { title: 'Spring', value: 100.22, group: 'Group 2' },
            { title: 'Generic', value: 15, group: 'Group 2' },
            { title: 'Others', value: 75, group: 'Group 2' },

            { title: 'Maelstorm', value: 90, group: 'Group 3' },
            { title: 'Spring', value: 100.22, group: 'Group 3' },
            { title: 'Generic', value: 35, group: 'Group 3' },
            { title: 'Others', value: 75, group: 'Group 3' },
          ]),
          title: 'Column chart: 4 groups, 4 elements',
        },
        format: { kind: 'column' },
        parent_id: null,
      },
      ...children,
    ]}
  </Component>
);
export const EditorOfThreeGroupsOfFourColumns = () => (
  <ThreeGroupsOfFourColumns as={Editor} {...actions('onChange')} />
);

export const SixGroupsOfSixColumns = ({
  as: Component = Content,
  children = [],
  ...props
}) => (
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
        id: '78f5d055-8a9f-48cc-bead-f6c9e8451ced',
        type: 'chart',
        body: {
          elements: createTitleIdentityBlockElements([
            { title: 'Maelstorm', value: 50.1, group: 'Group 1' },
            { title: 'Spring', value: 60.33, group: 'Group 1' },
            { title: 'Electro', value: 13, group: 'Group 1' },
            { title: 'HBO', value: 23, group: 'Group 1' },
            { title: 'Netflix', value: 33, group: 'Group 1' },
            { title: 'Amazon', value: 51, group: 'Group 1' },

            { title: 'Maelstorm', value: 90, group: 'Group 2' },
            { title: 'Spring', value: 100.22, group: 'Group 2' },
            { title: 'Electro', value: 14, group: 'Group 2' },
            { title: 'HBO', value: 10.22, group: 'Group 2' },
            { title: 'Netflix', value: 14, group: 'Group 2' },
            { title: 'Amazon', value: 27, group: 'Group 2' },

            { title: 'Maelstorm', value: 66, group: 'Group 3' },
            { title: 'Spring', value: 29, group: 'Group 3' },
            { title: 'Electro', value: 19, group: 'Group 3' },
            { title: 'HBO', value: 50, group: 'Group 3' },
            { title: 'Netflix', value: 95.45, group: 'Group 3' },
            { title: 'Amazon', value: 100, group: 'Group 3' },

            { title: 'Maelstorm', value: 50.1, group: 'Group 4' },
            { title: 'Spring', value: 60.33, group: 'Group 4' },
            { title: 'Electro', value: 13, group: 'Group 4' },
            { title: 'HBO', value: 23, group: 'Group 4' },
            { title: 'Netflix', value: 33, group: 'Group 4' },
            { title: 'Amazon', value: 72.5, group: 'Group 4' },

            { title: 'Maelstorm', value: 90, group: 'Group 5' },
            { title: 'Spring', value: 100.22, group: 'Group 5' },
            { title: 'Electro', value: 14, group: 'Group 5' },
            { title: 'HBO', value: 10.22, group: 'Group 5' },
            { title: 'Netflix', value: 14, group: 'Group 5' },
            { title: 'Amazon', value: 31.25, group: 'Group 5' },

            { title: 'Maelstorm', value: 66, group: 'Group 6' },
            { title: 'Spring', value: 29, group: 'Group 6' },
            { title: 'Electro', value: 19, group: 'Group 6' },
            { title: 'HBO', value: 50, group: 'Group 6' },
            { title: 'Netflix', value: 95.45, group: 'Group 6' },
            { title: 'Amazon', value: 5, group: 'Group 6' },
          ]),
          title: 'Column chart: 3 groups of 5 elements',
        },
        format: { kind: 'column' },
        parent_id: null,
      },
      ...children,
    ]}
  </Component>
);
export const EditorOfSixGroupsOfSixColumns = () => (
  <SixGroupsOfSixColumns as={Editor} {...actions('onChange')} />
);

export const SixGroupsOfTwoColumns = ({
  as: Component = Content,
  children = [],
  ...props
}) => (
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
        parent_id: null,
      },
      ...children,
    ]}
  </Component>
);
export const EditorOfSixGroupsOfTwoColumns = () => (
  <SixGroupsOfTwoColumns as={Editor} {...actions('onChange')} />
);

export const TwoGroupsOfSixColumns = ({
  as: Component = Content,
  children = [],
  format = {},
  ...props
}) => (
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
        id: '78f5d055-8a9f-48cc-bead-f6c9e8451ced',
        type: 'chart',
        body: {
          elements: createTitleIdentityBlockElements([
            { title: 'Maelstorm', value: 50.1, group: 'Group 1' },
            { title: 'Spring', value: 60.33, group: 'Group 1' },
            { title: 'Electro', value: 13, group: 'Group 1' },
            { title: 'HBO', value: 23, group: 'Group 1' },
            { title: 'Netflix', value: 33, group: 'Group 1' },
            { title: 'Amazon', value: 51, group: 'Group 1' },

            { title: 'Maelstorm', value: 90, group: 'Group 5' },
            { title: 'Spring', value: 100.22, group: 'Group 5' },
            { title: 'Electro', value: 14, group: 'Group 5' },
            { title: 'HBO', value: 10.22, group: 'Group 5' },
            { title: 'Netflix', value: 14, group: 'Group 5' },
            { title: 'Amazon', value: 31.25, group: 'Group 5' },
          ]),
          title: 'Column chart: 3 groups of 5 elements',
        },
        format: { ...format, kind: 'column' },
        parent_id: null,
      },
      ...children,
    ]}
  </Component>
);
export const TwoGroupsOfSixColumnsMinValue20MaxValue100AndDy5 = () => (
  <TwoGroupsOfSixColumns format={{ minValue: 20, maxValue: 100, dy: 5 }} />
);
export const TwoGroupsOfSixColumnsMinValueMinus20MaxValue100AndDy18 = () => (
  <TwoGroupsOfSixColumns format={{ minValue: -10, maxValue: 160, dy: 18 }} />
);
export const EditorOfTwoGroupsOfSixColumns = () => (
  <TwoGroupsOfSixColumns as={Editor} {...actions('onChange')} />
);

export const LineChart = ({
  as: Component = Content,
  children = [],
  ...props
}) => (
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
        parent_id: null,
      },
      ...children,
    ]}
  </Component>
);

export const EditorOfLineChart = () => (
  <LineChart as={Editor} {...actions('onChange')} />
);

export const PieChart = ({
  as: Component = Content,
  children = [],
  ...props
}) => (
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
        id: '63d30846-a1dc-4c50-a32a-21ca99c38bce',
        type: 'chart',
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
        format: { kind: 'pie' },
        parent_id: null,
      },
      ...children,
    ]}
  </Component>
);

export const EditorOfPieChart = () => (
  <PieChart as={Editor} {...actions('onChange')} />
);
