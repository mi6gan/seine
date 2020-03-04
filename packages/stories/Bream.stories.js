// @flow
import React from 'react';
import {
  SuiteLogsBCGLayout,
  useBreamStoryEffect,
  BreamThemeProvider,
} from '@seine/testbox';
import { Content } from '@seine/content';

type Props = {
  children?: any,
};

export default { title: 'Bream' };

const Themed = ({ children = null }: Props) => {
  useBreamStoryEffect(...document.children);

  return <BreamThemeProvider>{children}</BreamThemeProvider>;
};

export const ContentInBCGLayout = ({
  title = 'BCG layout title',
  subtitle = 'BCG layout subtitle',
  description = 'BCG layout description',
  children = 'BCG layout content',
}) => (
  <Themed>
    <SuiteLogsBCGLayout
      title={title}
      subtitle={subtitle}
      description={description}
    >
      {children}
    </SuiteLogsBCGLayout>
  </Themed>
);

export const BarChartInBCGLayout = (props) => (
  <ContentInBCGLayout
    {...props}
    description={
      <Content
        parent={{
          id: '02319732-ee0f-4c91-9eac-9b3709d91185',
          type: 'page',
          parent_id: null,
          body: {},
          format: {},
          schema: null,
        }}
      >
        {[
          {
            id: '36be0849-caf9-4231-8ca2-261436eb0e7e',
            type: 'chart',
            parent_id: '02319732-ee0f-4c91-9eac-9b3709d91185',
            body: {
              title: 'Bar chart in BCG Layout',
              elements: [
                { title: 'Promenade', value: 35 },
                { title: 'San jose', value: 70 },
                {
                  id: '8ddb8338-e17b-4b9a-8feb-b3d3d4107c39',
                  title: 'Arlington',
                  value: 32,
                },
                {
                  id: '7c61fa33-6e45-4256-abbd-af80077d6e35',
                  title: 'Virginia',
                  value: 72,
                },
                {
                  id: 'ab04ad71-2e97-4ba0-92cc-be0dd63e4b75',
                  title: 'Isthmus',
                  value: 42,
                },
                {
                  id: 'b3705829-002b-414d-90f8-762643045c1d',
                  title: 'Austin',
                  value: 102,
                },
              ],
            },
            format: { kind: 'bar' },
            schema: null,
          },
        ]}
      </Content>
    }
  />
);

export const ColumnChartInBCGLayout = (props) => (
  <ContentInBCGLayout
    {...props}
    description={
      <Content
        parent={{
          id: 'd36bd0fb-9689-49f5-9cb6-e5e2c1796648',
          type: 'page',
          parent_id: null,
          body: {},
          format: {},
          schema: null,
        }}
      >
        {[
          {
            id: '564b9c4a-adfd-4456-ab07-b9394903e6ea',
            type: 'chart',
            parent_id: 'd36bd0fb-9689-49f5-9cb6-e5e2c1796648',
            body: {
              title: 'Column chart in BCG Layout',
              elements: [
                {
                  id: 'ea9cd917-6391-437a-925e-b0eca1f6aa30',
                  group: 'group 1',
                  title: 'First Column',
                  value: 35,
                },
                {
                  id: '32aebc82-1abc-412d-806c-d0a5ebc6be19',
                  group: 'group 1',
                  title: 'Second Column',
                  value: 70,
                },
                {
                  id: 'ea9cd917-6391-437a-925e-b0eca1f6aa30',
                  group: 'group 2',
                  title: 'First Column',
                  value: 70,
                },
                {
                  id: '32aebc82-1abc-412d-806c-d0a5ebc6be19',
                  group: 'group 2',
                  title: 'Second Column',
                  value: 35,
                },
                {
                  id: 'ea9cd917-6391-437a-925e-b0eca1f6aa30',
                  group: 'group 3',
                  title: 'First Column',
                  value: 35,
                },
                {
                  id: '32aebc82-1abc-412d-806c-d0a5ebc6be19',
                  group: 'group 3',
                  title: 'Second Column',
                  value: 35,
                },
                {
                  id: '0622aebe-f770-477b-9a34-e775c6375d4d',
                  group: 'group 1',
                  title: 'Item #2',
                  value: 88,
                },
                {
                  id: '0622aebe-f770-477b-9a34-e775c6375d4d',
                  group: 'group 2',
                  title: 'Item #2',
                  value: 56,
                },
                {
                  id: '0622aebe-f770-477b-9a34-e775c6375d4d',
                  group: 'group 3',
                  title: 'Item #2',
                  value: 99,
                },
                {
                  id: 'ddd19b51-44f6-4c65-9780-d4367ea085a1',
                  group: 'group 1',
                  title: 'Item #3',
                  value: 24,
                },
                {
                  id: 'ddd19b51-44f6-4c65-9780-d4367ea085a1',
                  group: 'group 2',
                  title: 'Item #3',
                  value: 26,
                },
                {
                  id: 'ddd19b51-44f6-4c65-9780-d4367ea085a1',
                  group: 'group 3',
                  title: 'Item #3',
                  value: 77,
                },
              ],
            },
            format: { kind: 'column' },
            schema: null,
          },
        ]}
      </Content>
    }
  />
);

export const PieChartInBCGLayout = (props) => (
  <ContentInBCGLayout
    {...props}
    description={
      <Content
        parent={{
          id: '044d4dca-4924-4a9d-9e6b-55b9be006b70',
          type: 'page',
          parent_id: null,
          body: {},
          format: {},
          schema: null,
        }}
      >
        {[
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
        ]}
      </Content>
    }
  />
);

export const LineChartInBCGLayout = (props) => (
  <ContentInBCGLayout
    {...props}
    description={
      <Content
        parent={{
          id: '0933fd80-4959-4cf6-b255-d99b9c992772',
          type: 'page',
          parent_id: null,
          body: {},
          format: {},
          schema: null,
        }}
      >
        {[
          {
            id: '41ec5fa5-f361-4ef4-9a57-be13d184d166',
            type: 'chart',
            parent_id: '0933fd80-4959-4cf6-b255-d99b9c992772',
            body: {
              title:
                'Oil production in thousands of barrels per day by countries',
              elements: [
                {
                  id: '80db6ead-7041-4494-8fbf-426920b84945',
                  group: '2011',
                  title: 'US',
                  value: 7853,
                },
                {
                  id: 'b0bb52ae-a990-4f42-8467-88010d1ea549',
                  group: '2011',
                  title: 'Canada',
                  value: 3515,
                },
                {
                  id: '80db6ead-7041-4494-8fbf-426920b84945',
                  group: '2012',
                  title: 'US',
                  value: 8883,
                },
                {
                  id: 'b0bb52ae-a990-4f42-8467-88010d1ea549',
                  group: '2012',
                  title: 'Canada',
                  value: 3740,
                },
                {
                  id: '80db6ead-7041-4494-8fbf-426920b84945',
                  group: '2013',
                  title: 'US',
                  value: 10059,
                },
                {
                  id: 'b0bb52ae-a990-4f42-8467-88010d1ea549',
                  group: '2013',
                  title: 'Canada',
                  value: 4000,
                },
                {
                  id: '80db6ead-7041-4494-8fbf-426920b84945',
                  group: '2014',
                  title: 'US',
                  value: 11723,
                },
                {
                  id: 'b0bb52ae-a990-4f42-8467-88010d1ea549',
                  group: '2014',
                  title: 'Canada',
                  value: 4278,
                },
                {
                  id: '80db6ead-7041-4494-8fbf-426920b84945',
                  group: '2015',
                  title: 'US',
                  value: 12704,
                },
                {
                  id: 'b0bb52ae-a990-4f42-8467-88010d1ea549',
                  group: '2015',
                  title: 'Canada',
                  value: 4385,
                },
                {
                  id: 'a5a7e84a-09da-42c9-9f1a-e16f19cd4075',
                  group: '2011',
                  title: 'Mexico',
                  value: 2942,
                },
                {
                  id: 'a5a7e84a-09da-42c9-9f1a-e16f19cd4075',
                  group: '2012',
                  title: 'Mexico',
                  value: 2912,
                },
                {
                  id: 'a5a7e84a-09da-42c9-9f1a-e16f19cd4075',
                  group: '2013',
                  title: 'Mexico',
                  value: 2876,
                },
                {
                  id: 'a5a7e84a-09da-42c9-9f1a-e16f19cd4075',
                  group: '2014',
                  title: 'Mexico',
                  value: 2785,
                },
                {
                  id: 'a5a7e84a-09da-42c9-9f1a-e16f19cd4075',
                  group: '2015',
                  title: 'Mexico',
                  value: 2588,
                },
              ],
            },
            format: {
              dy: 1000,
              kind: 'line',
              maxValue: 14000,
              minValue: 0,
              verticalAlignment: 'start',
            },
            schema: null,
          },
        ]}
      </Content>
    }
  />
);

export const TwoPieChartsInBCGLayout = (props) => (
  <ContentInBCGLayout
    {...props}
    description={
      <Content
        parent={{
          id: '044d4dca-4924-4a9d-9e6b-55b9be006b70',
          type: 'page',
          parent_id: null,
          body: {},
          format: {},
          schema: null,
        }}
      >
        {[
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
                { title: 'Luxury cars', value: 4349 },
                { title: 'Mid-class cars', value: 4423 },
                { title: 'SUVs', value: 3423 },
                { title: 'Others', value: 4423 },
                {
                  id: 'ee83f39d-03bc-4878-9c78-0edef43e936b',
                  title: 'Hatchbacks',
                  value: 4234,
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
      </Content>
    }
  />
);

export const ColumnAndLineChartsInBCGLayout = (props) => (
  <ContentInBCGLayout
    {...props}
    description={
      <Content
        parent={{
          id: 'b6e8234b-1899-455f-8a92-b8ce5c4010c8',
          type: 'page',
          parent_id: null,
          body: {},
          format: {},
          schema: null,
        }}
      >
        {[
          {
            id: '2636d441-6d48-4101-9061-ce4064c5ce84',
            type: 'grid',
            parent_id: 'b6e8234b-1899-455f-8a92-b8ce5c4010c8',
            body: {},
            format: {},
            schema: null,
          },
          {
            id: '564b9c4a-adfd-4456-ab07-b9394903e6ea',
            type: 'chart',
            parent_id: '2636d441-6d48-4101-9061-ce4064c5ce84',
            body: {
              title: 'Column chart in BCG Layout',
              elements: [
                {
                  id: 'ea9cd917-6391-437a-925e-b0eca1f6aa30',
                  group: 'group 1',
                  title: 'First Column',
                  value: 35,
                },
                {
                  id: '32aebc82-1abc-412d-806c-d0a5ebc6be19',
                  group: 'group 1',
                  title: 'Second Column',
                  value: 70,
                },
                {
                  id: 'ea9cd917-6391-437a-925e-b0eca1f6aa30',
                  group: 'group 2',
                  title: 'First Column',
                  value: 70,
                },
                {
                  id: '32aebc82-1abc-412d-806c-d0a5ebc6be19',
                  group: 'group 2',
                  title: 'Second Column',
                  value: 35,
                },
                {
                  id: 'ea9cd917-6391-437a-925e-b0eca1f6aa30',
                  group: 'group 3',
                  title: 'First Column',
                  value: 35,
                },
                {
                  id: '32aebc82-1abc-412d-806c-d0a5ebc6be19',
                  group: 'group 3',
                  title: 'Second Column',
                  value: 35,
                },
                {
                  id: '0622aebe-f770-477b-9a34-e775c6375d4d',
                  group: 'group 1',
                  title: 'Item #2',
                  value: 88,
                },
                {
                  id: '0622aebe-f770-477b-9a34-e775c6375d4d',
                  group: 'group 2',
                  title: 'Item #2',
                  value: 56,
                },
                {
                  id: '0622aebe-f770-477b-9a34-e775c6375d4d',
                  group: 'group 3',
                  title: 'Item #2',
                  value: 99,
                },
                {
                  id: 'ddd19b51-44f6-4c65-9780-d4367ea085a1',
                  group: 'group 1',
                  title: 'Item #3',
                  value: 24,
                },
                {
                  id: 'ddd19b51-44f6-4c65-9780-d4367ea085a1',
                  group: 'group 2',
                  title: 'Item #3',
                  value: 26,
                },
                {
                  id: 'ddd19b51-44f6-4c65-9780-d4367ea085a1',
                  group: 'group 3',
                  title: 'Item #3',
                  value: 77,
                },
              ],
            },
            format: { kind: 'column' },
            schema: null,
          },
          {
            id: '41ec5fa5-f361-4ef4-9a57-be13d184d166',
            type: 'chart',
            parent_id: '2636d441-6d48-4101-9061-ce4064c5ce84',
            body: {
              title:
                'Oil production in thousands of barrels per day by countries',
              elements: [
                {
                  id: '80db6ead-7041-4494-8fbf-426920b84945',
                  group: '2011',
                  title: 'US',
                  value: 7853,
                },
                {
                  id: 'b0bb52ae-a990-4f42-8467-88010d1ea549',
                  group: '2011',
                  title: 'Canada',
                  value: 3515,
                },
                {
                  id: '80db6ead-7041-4494-8fbf-426920b84945',
                  group: '2012',
                  title: 'US',
                  value: 8883,
                },
                {
                  id: 'b0bb52ae-a990-4f42-8467-88010d1ea549',
                  group: '2012',
                  title: 'Canada',
                  value: 3740,
                },
                {
                  id: '80db6ead-7041-4494-8fbf-426920b84945',
                  group: '2013',
                  title: 'US',
                  value: 10059,
                },
                {
                  id: 'b0bb52ae-a990-4f42-8467-88010d1ea549',
                  group: '2013',
                  title: 'Canada',
                  value: 4000,
                },
                {
                  id: '80db6ead-7041-4494-8fbf-426920b84945',
                  group: '2014',
                  title: 'US',
                  value: 11723,
                },
                {
                  id: 'b0bb52ae-a990-4f42-8467-88010d1ea549',
                  group: '2014',
                  title: 'Canada',
                  value: 4278,
                },
                {
                  id: '80db6ead-7041-4494-8fbf-426920b84945',
                  group: '2015',
                  title: 'US',
                  value: 12704,
                },
                {
                  id: 'b0bb52ae-a990-4f42-8467-88010d1ea549',
                  group: '2015',
                  title: 'Canada',
                  value: 4385,
                },
                {
                  id: 'a5a7e84a-09da-42c9-9f1a-e16f19cd4075',
                  group: '2011',
                  title: 'Mexico',
                  value: 2942,
                },
                {
                  id: 'a5a7e84a-09da-42c9-9f1a-e16f19cd4075',
                  group: '2012',
                  title: 'Mexico',
                  value: 2912,
                },
                {
                  id: 'a5a7e84a-09da-42c9-9f1a-e16f19cd4075',
                  group: '2013',
                  title: 'Mexico',
                  value: 2876,
                },
                {
                  id: 'a5a7e84a-09da-42c9-9f1a-e16f19cd4075',
                  group: '2014',
                  title: 'Mexico',
                  value: 2785,
                },
                {
                  id: 'a5a7e84a-09da-42c9-9f1a-e16f19cd4075',
                  group: '2015',
                  title: 'Mexico',
                  value: 2588,
                },
              ],
            },
            format: {
              dy: 1000,
              kind: 'line',
              maxValue: 14000,
              minValue: 0,
              verticalAlignment: 'start',
            },
            schema: null,
          },
        ]}
      </Content>
    }
  />
);

export const ColumnPieAndLineChartsInBCGLayout = (props) => (
  <ContentInBCGLayout
    {...props}
    description={
      <Content
        parent={{
          id: 'b6e8234b-1899-455f-8a92-b8ce5c4010c8',
          type: 'page',
          parent_id: null,
          body: {},
          format: {},
          schema: null,
        }}
      >
        {[
          {
            id: '2636d441-6d48-4101-9061-ce4064c5ce84',
            type: 'grid',
            parent_id: 'b6e8234b-1899-455f-8a92-b8ce5c4010c8',
            body: {},
            format: {},
            schema: null,
          },
          {
            id: '564b9c4a-adfd-4456-ab07-b9394903e6ea',
            type: 'chart',
            parent_id: '2636d441-6d48-4101-9061-ce4064c5ce84',
            body: {
              title: 'Column chart in BCG Layout',
              elements: [
                {
                  id: 'ea9cd917-6391-437a-925e-b0eca1f6aa30',
                  group: 'group 1',
                  title: 'First Column',
                  value: 35,
                },
                {
                  id: '32aebc82-1abc-412d-806c-d0a5ebc6be19',
                  group: 'group 1',
                  title: 'Second Column',
                  value: 70,
                },
                {
                  id: 'ea9cd917-6391-437a-925e-b0eca1f6aa30',
                  group: 'group 2',
                  title: 'First Column',
                  value: 70,
                },
                {
                  id: '32aebc82-1abc-412d-806c-d0a5ebc6be19',
                  group: 'group 2',
                  title: 'Second Column',
                  value: 35,
                },
                {
                  id: 'ea9cd917-6391-437a-925e-b0eca1f6aa30',
                  group: 'group 3',
                  title: 'First Column',
                  value: 35,
                },
                {
                  id: '32aebc82-1abc-412d-806c-d0a5ebc6be19',
                  group: 'group 3',
                  title: 'Second Column',
                  value: 35,
                },
                {
                  id: '0622aebe-f770-477b-9a34-e775c6375d4d',
                  group: 'group 1',
                  title: 'Item #2',
                  value: 88,
                },
                {
                  id: '0622aebe-f770-477b-9a34-e775c6375d4d',
                  group: 'group 2',
                  title: 'Item #2',
                  value: 56,
                },
                {
                  id: '0622aebe-f770-477b-9a34-e775c6375d4d',
                  group: 'group 3',
                  title: 'Item #2',
                  value: 99,
                },
                {
                  id: 'ddd19b51-44f6-4c65-9780-d4367ea085a1',
                  group: 'group 1',
                  title: 'Item #3',
                  value: 24,
                },
                {
                  id: 'ddd19b51-44f6-4c65-9780-d4367ea085a1',
                  group: 'group 2',
                  title: 'Item #3',
                  value: 26,
                },
                {
                  id: 'ddd19b51-44f6-4c65-9780-d4367ea085a1',
                  group: 'group 3',
                  title: 'Item #3',
                  value: 77,
                },
              ],
            },
            format: { kind: 'column' },
            schema: null,
          },
          {
            id: 'cd271f11-75a5-4bff-ab2b-266f7eb4418d',
            type: 'chart',
            parent_id: '2636d441-6d48-4101-9061-ce4064c5ce84',
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
            id: '41ec5fa5-f361-4ef4-9a57-be13d184d166',
            type: 'chart',
            parent_id: 'b6e8234b-1899-455f-8a92-b8ce5c4010c8',
            body: {
              title:
                'Oil production in thousands of barrels per day by countries',
              elements: [
                {
                  id: '80db6ead-7041-4494-8fbf-426920b84945',
                  group: '2011',
                  title: 'US',
                  value: 7853,
                },
                {
                  id: 'b0bb52ae-a990-4f42-8467-88010d1ea549',
                  group: '2011',
                  title: 'Canada',
                  value: 3515,
                },
                {
                  id: '80db6ead-7041-4494-8fbf-426920b84945',
                  group: '2012',
                  title: 'US',
                  value: 8883,
                },
                {
                  id: 'b0bb52ae-a990-4f42-8467-88010d1ea549',
                  group: '2012',
                  title: 'Canada',
                  value: 3740,
                },
                {
                  id: '80db6ead-7041-4494-8fbf-426920b84945',
                  group: '2013',
                  title: 'US',
                  value: 10059,
                },
                {
                  id: 'b0bb52ae-a990-4f42-8467-88010d1ea549',
                  group: '2013',
                  title: 'Canada',
                  value: 4000,
                },
                {
                  id: '80db6ead-7041-4494-8fbf-426920b84945',
                  group: '2014',
                  title: 'US',
                  value: 11723,
                },
                {
                  id: 'b0bb52ae-a990-4f42-8467-88010d1ea549',
                  group: '2014',
                  title: 'Canada',
                  value: 4278,
                },
                {
                  id: '80db6ead-7041-4494-8fbf-426920b84945',
                  group: '2015',
                  title: 'US',
                  value: 12704,
                },
                {
                  id: 'b0bb52ae-a990-4f42-8467-88010d1ea549',
                  group: '2015',
                  title: 'Canada',
                  value: 4385,
                },
                {
                  id: 'a5a7e84a-09da-42c9-9f1a-e16f19cd4075',
                  group: '2011',
                  title: 'Mexico',
                  value: 2942,
                },
                {
                  id: 'a5a7e84a-09da-42c9-9f1a-e16f19cd4075',
                  group: '2012',
                  title: 'Mexico',
                  value: 2912,
                },
                {
                  id: 'a5a7e84a-09da-42c9-9f1a-e16f19cd4075',
                  group: '2013',
                  title: 'Mexico',
                  value: 2876,
                },
                {
                  id: 'a5a7e84a-09da-42c9-9f1a-e16f19cd4075',
                  group: '2014',
                  title: 'Mexico',
                  value: 2785,
                },
                {
                  id: 'a5a7e84a-09da-42c9-9f1a-e16f19cd4075',
                  group: '2015',
                  title: 'Mexico',
                  value: 2588,
                },
              ],
            },
            format: {
              dy: 1000,
              kind: 'line',
              maxValue: 14000,
              minValue: 0,
              verticalAlignment: 'start',
            },
            schema: null,
          },
        ]}
      </Content>
    }
  />
);

export const ColumnPieBarAndLineChartsInBCGLayout = (props) => (
  <ContentInBCGLayout
    {...props}
    description={
      <Content
        parent={{
          id: 'b6e8234b-1899-455f-8a92-b8ce5c4010c8',
          type: 'page',
          parent_id: null,
          body: {},
          format: {},
          schema: null,
        }}
      >
        {[
          {
            id: '2636d441-6d48-4101-9061-ce4064c5ce84',
            type: 'grid',
            parent_id: 'b6e8234b-1899-455f-8a92-b8ce5c4010c8',
            body: {},
            format: {},
            schema: null,
          },
          {
            id: '564b9c4a-adfd-4456-ab07-b9394903e6ea',
            type: 'chart',
            parent_id: '2636d441-6d48-4101-9061-ce4064c5ce84',
            body: {
              title: 'Column chart in BCG Layout',
              elements: [
                {
                  id: 'ea9cd917-6391-437a-925e-b0eca1f6aa30',
                  group: 'group 1',
                  title: 'First Column',
                  value: 35,
                },
                {
                  id: '32aebc82-1abc-412d-806c-d0a5ebc6be19',
                  group: 'group 1',
                  title: 'Second Column',
                  value: 70,
                },
                {
                  id: 'ea9cd917-6391-437a-925e-b0eca1f6aa30',
                  group: 'group 2',
                  title: 'First Column',
                  value: 70,
                },
                {
                  id: '32aebc82-1abc-412d-806c-d0a5ebc6be19',
                  group: 'group 2',
                  title: 'Second Column',
                  value: 35,
                },
                {
                  id: 'ea9cd917-6391-437a-925e-b0eca1f6aa30',
                  group: 'group 3',
                  title: 'First Column',
                  value: 35,
                },
                {
                  id: '32aebc82-1abc-412d-806c-d0a5ebc6be19',
                  group: 'group 3',
                  title: 'Second Column',
                  value: 35,
                },
                {
                  id: '0622aebe-f770-477b-9a34-e775c6375d4d',
                  group: 'group 1',
                  title: 'Item #2',
                  value: 88,
                },
                {
                  id: '0622aebe-f770-477b-9a34-e775c6375d4d',
                  group: 'group 2',
                  title: 'Item #2',
                  value: 56,
                },
                {
                  id: '0622aebe-f770-477b-9a34-e775c6375d4d',
                  group: 'group 3',
                  title: 'Item #2',
                  value: 99,
                },
                {
                  id: 'ddd19b51-44f6-4c65-9780-d4367ea085a1',
                  group: 'group 1',
                  title: 'Item #3',
                  value: 24,
                },
                {
                  id: 'ddd19b51-44f6-4c65-9780-d4367ea085a1',
                  group: 'group 2',
                  title: 'Item #3',
                  value: 26,
                },
                {
                  id: 'ddd19b51-44f6-4c65-9780-d4367ea085a1',
                  group: 'group 3',
                  title: 'Item #3',
                  value: 77,
                },
              ],
            },
            format: { kind: 'column' },
            schema: null,
          },
          {
            id: '36be0849-caf9-4231-8ca2-261436eb0e7e',
            type: 'chart',
            parent_id: '2636d441-6d48-4101-9061-ce4064c5ce84',
            body: {
              title: 'Bar chart in BCG Layout',
              elements: [
                {
                  id: 'copy-01a88822-295d-41a7-b1c4-e4b0c376f7ff',
                  title: 'Copy of Promenade',
                  value: 35,
                },
                {
                  id: 'copy-5d569158-4798-48d7-bf42-3558cbe3e483',
                  title: 'Copy of San jose',
                  value: 70,
                },
                {
                  id: 'copy-8ddb8338-e17b-4b9a-8feb-b3d3d4107c39',
                  title: 'Copy of Arlington',
                  value: 32,
                },
                {
                  id: 'copy-7c61fa33-6e45-4256-abbd-af80077d6e35',
                  title: 'Copy of Virginia',
                  value: 72,
                },
                {
                  id: 'copy-ab04ad71-2e97-4ba0-92cc-be0dd63e4b75',
                  title: 'Copy of Isthmus',
                  value: 42,
                },
                {
                  id: 'copy-b3705829-002b-414d-90f8-762643045c1d',
                  title: 'Copy of Austin',
                  value: 102,
                },
                {
                  id: '01a88822-295d-41a7-b1c4-e4b0c376f7ff',
                  title: 'Promenade',
                  value: 35,
                },
                {
                  id: '5d569158-4798-48d7-bf42-3558cbe3e483',
                  title: 'San jose',
                  value: 70,
                },
                {
                  id: '8ddb8338-e17b-4b9a-8feb-b3d3d4107c39',
                  title: 'Arlington',
                  value: 32,
                },
                {
                  id: '7c61fa33-6e45-4256-abbd-af80077d6e35',
                  title: 'Virginia',
                  value: 72,
                },
                {
                  id: 'ab04ad71-2e97-4ba0-92cc-be0dd63e4b75',
                  title: 'Isthmus',
                  value: 42,
                },
                {
                  id: 'b3705829-002b-414d-90f8-762643045c1d',
                  title: 'Austin',
                  value: 102,
                },
              ],
            },
            format: { kind: 'bar', legend: true, units: '%' },
            schema: null,
          },
          {
            id: '41ec5fa5-f361-4ef4-9a57-be13d184d166',
            type: 'chart',
            parent_id: '2636d441-6d48-4101-9061-ce4064c5ce84',
            body: {
              title:
                'Oil production in thousands of barrels per day by countries',
              elements: [
                {
                  id: '80db6ead-7041-4494-8fbf-426920b84945',
                  group: '2011',
                  title: 'US',
                  value: 7853,
                },
                {
                  id: 'b0bb52ae-a990-4f42-8467-88010d1ea549',
                  group: '2011',
                  title: 'Canada',
                  value: 3515,
                },
                {
                  id: '80db6ead-7041-4494-8fbf-426920b84945',
                  group: '2012',
                  title: 'US',
                  value: 8883,
                },
                {
                  id: 'b0bb52ae-a990-4f42-8467-88010d1ea549',
                  group: '2012',
                  title: 'Canada',
                  value: 3740,
                },
                {
                  id: '80db6ead-7041-4494-8fbf-426920b84945',
                  group: '2013',
                  title: 'US',
                  value: 10059,
                },
                {
                  id: 'b0bb52ae-a990-4f42-8467-88010d1ea549',
                  group: '2013',
                  title: 'Canada',
                  value: 4000,
                },
                {
                  id: '80db6ead-7041-4494-8fbf-426920b84945',
                  group: '2014',
                  title: 'US',
                  value: 11723,
                },
                {
                  id: 'b0bb52ae-a990-4f42-8467-88010d1ea549',
                  group: '2014',
                  title: 'Canada',
                  value: 4278,
                },
                {
                  id: '80db6ead-7041-4494-8fbf-426920b84945',
                  group: '2015',
                  title: 'US',
                  value: 12704,
                },
                {
                  id: 'b0bb52ae-a990-4f42-8467-88010d1ea549',
                  group: '2015',
                  title: 'Canada',
                  value: 4385,
                },
                {
                  id: 'a5a7e84a-09da-42c9-9f1a-e16f19cd4075',
                  group: '2011',
                  title: 'Mexico',
                  value: 2942,
                },
                {
                  id: 'a5a7e84a-09da-42c9-9f1a-e16f19cd4075',
                  group: '2012',
                  title: 'Mexico',
                  value: 2912,
                },
                {
                  id: 'a5a7e84a-09da-42c9-9f1a-e16f19cd4075',
                  group: '2013',
                  title: 'Mexico',
                  value: 2876,
                },
                {
                  id: 'a5a7e84a-09da-42c9-9f1a-e16f19cd4075',
                  group: '2014',
                  title: 'Mexico',
                  value: 2785,
                },
                {
                  id: 'a5a7e84a-09da-42c9-9f1a-e16f19cd4075',
                  group: '2015',
                  title: 'Mexico',
                  value: 2588,
                },
              ],
            },
            format: {
              dy: 1000,
              kind: 'line',
              maxValue: 14000,
              minValue: 0,
              verticalAlignment: 'start',
            },
            schema: null,
          },
          {
            id: 'cd271f11-75a5-4bff-ab2b-266f7eb4418d',
            type: 'chart',
            parent_id: '2636d441-6d48-4101-9061-ce4064c5ce84',
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
        ]}
      </Content>
    }
  />
);
