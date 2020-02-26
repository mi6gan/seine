// @flow
import React from 'react';
import {
  breamTheme,
  SuiteLogsBCGLayout,
  ThemeProvider,
  useBreamStoryEffect,
} from '@seine/styles';
import { Content } from '@seine/content';

import { BarChart, PieChart } from './Chart.stories';

type Props = {
  children?: any,
};

export default { title: 'Bream' };

const Themed = ({ children }: Props) => {
  useBreamStoryEffect(...document.children);

  return <ThemeProvider theme={breamTheme}>{children}</ThemeProvider>;
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
  <ContentInBCGLayout {...props} description={<BarChart />} />
);

export const ColumnChartInBCGLayout = (props) => (
  <ContentInBCGLayout
    {...props}
    description={
      <Content
        parent={{
          id: 'ce917dee-a0e4-48d1-ba39-abb347c1ceb2',
          type: 'page',
          parent_id: null,
          body: {},
          format: {},
          schema: null,
        }}
      >
        {[
          {
            id: '2efd6e81-7d8f-4fb0-9f9d-338c3e69587c',
            type: 'chart',
            parent_id: 'ce917dee-a0e4-48d1-ba39-abb347c1ceb2',
            body: {
              title: 'Tax contribution by generations ($ mln)',
              elements: [
                {
                  id: 'ddffa3b4-2c3e-496a-adf5-d50fb271005b',
                  group: '2011',
                  title: 'Baby-boomers',
                  value: 253,
                },
                {
                  id: 'd0485e26-96ad-4f36-ad08-2b5ff28c4d41',
                  group: '2011',
                  title: 'Generation Y',
                  value: 574,
                },
                {
                  id: 'ddffa3b4-2c3e-496a-adf5-d50fb271005b',
                  group: '2012',
                  title: 'Baby-boomers',
                  value: 274,
                },
                {
                  id: 'd0485e26-96ad-4f36-ad08-2b5ff28c4d41',
                  group: '2012',
                  title: 'Generation Y',
                  value: 647,
                },
                {
                  id: 'ddffa3b4-2c3e-496a-adf5-d50fb271005b',
                  group: '2013',
                  title: 'Baby-boomers',
                  value: 283,
                },
                {
                  id: 'd0485e26-96ad-4f36-ad08-2b5ff28c4d41',
                  group: '2013',
                  title: 'Generation Y',
                  value: 723,
                },
                {
                  id: 'ddffa3b4-2c3e-496a-adf5-d50fb271005b',
                  group: '2014',
                  title: 'Baby-boomers',
                  value: 302,
                },
                {
                  id: 'd0485e26-96ad-4f36-ad08-2b5ff28c4d41',
                  group: '2014',
                  title: 'Generation Y',
                  value: 841,
                },
                {
                  id: 'ddffa3b4-2c3e-496a-adf5-d50fb271005b',
                  group: '2015',
                  title: 'Baby-boomers',
                  value: 312,
                },
                {
                  id: 'd0485e26-96ad-4f36-ad08-2b5ff28c4d41',
                  group: '2015',
                  title: 'Generation Y',
                  value: 825,
                },
              ],
            },
            format: {
              dy: 100,
              kind: 'column',
              palette: [
                '#71a2ff',
                'rgba(172,190,203,1)',
                '#cbcbcb',
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
              maxValue: 900,
              minValue: 0,
            },
            schema: null,
          },
        ]}
      </Content>
    }
  />
);

export const PieChartInBCGLayout = (props) => (
  <ContentInBCGLayout {...props} description={<PieChart />} />
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
      </Content>
    }
  />
);

export const ColumnAndLineCharts = (props) => (
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
            id: '857bd635-8924-43d7-bdf4-c50a044acf3c',
            type: 'chart',
            parent_id: '2636d441-6d48-4101-9061-ce4064c5ce84',
            body: {
              elements: [
                {
                  id: 'a7e4478d-26fa-40ba-aa39-e41d549ea3b1',
                  group: 'group 1',
                  title: 'First Column',
                  value: 35,
                },
                {
                  id: '4d7d31bd-802a-4f37-9094-d0e71d0b1dc3',
                  group: 'group 1',
                  title: 'Second Column',
                  value: 70,
                },
                {
                  id: 'a7e4478d-26fa-40ba-aa39-e41d549ea3b1',
                  group: 'group 2',
                  title: 'First Column',
                  value: 70,
                },
                {
                  id: '4d7d31bd-802a-4f37-9094-d0e71d0b1dc3',
                  group: 'group 2',
                  title: 'Second Column',
                  value: 35,
                },
                {
                  id: 'a7e4478d-26fa-40ba-aa39-e41d549ea3b1',
                  group: 'group 3',
                  title: 'First Column',
                  value: 35,
                },
                {
                  id: '4d7d31bd-802a-4f37-9094-d0e71d0b1dc3',
                  group: 'group 3',
                  title: 'Second Column',
                  value: 35,
                },
              ],
            },
            format: { kind: 'column', verticalAlignment: 'end' },
            schema: null,
          },
          {
            id: '5e7e31e1-4cc1-4df8-8dcd-677cad22e5dd',
            type: 'chart',
            parent_id: '2636d441-6d48-4101-9061-ce4064c5ce84',
            body: {
              elements: [
                {
                  id: 'e1921389-a733-4c9b-bebb-046cfc9fd1d8',
                  group: 'group 1',
                  title: 'Top',
                  value: 100,
                },
                {
                  id: 'aad33e74-bde3-406f-9b8e-a23e096d8022',
                  group: 'group 1',
                  title: 'Bottom',
                  value: 10,
                },
                {
                  id: 'e1921389-a733-4c9b-bebb-046cfc9fd1d8',
                  group: 'group 2',
                  title: 'Top',
                  value: 100,
                },
                {
                  id: 'aad33e74-bde3-406f-9b8e-a23e096d8022',
                  group: 'group 2',
                  title: 'Bottom',
                  value: 10,
                },
              ],
            },
            format: { kind: 'line', verticalAlignment: 'start' },
            schema: null,
          },
        ]}
      </Content>
    }
  />
);
