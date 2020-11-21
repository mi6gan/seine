// @flow
import type { ItemFormat } from './layout';
import { defaultItemFormat } from './layout';

export const CHART = 'chart';
export const chartTypes = {
  BAR: 'bar',
  COLUMN: 'column',
  PIE: 'pie',
  LINE: 'line',
};

export type ChartType = $Values<typeof chartTypes>;

export type ChartFormat = ItemFormat & {
  dx: number,
  dy: number,
  kind: ChartType,
  minValue: number,
  maxValue: number,
  palette: string[],
  paletteKey: 'bcg' | 'black' | 'default' | 'mcKinseyDeep' | 'mcKinseyLight',
  units: string,
  xAxis: boolean,
  yAxis: boolean,
  legend: boolean,
  autoFormat: boolean,
  fraction: number,
  height: number,
};

export type ChartElement = {
  id: string,
  group: string,
  title: string,
  value: number,
};
export type ChartBody = {
  elements: $ReadOnlyArray<ChartElement>,
  title: string,
};

export const chartPaletteKeyValues = {
  bcg: [
    '#1b591d',
    '#247727',
    '#29a147',
    '#2db851',
    '#7fc791',
    '#aad296',
    '#daebd1',
  ],
  black: [
    '#343433',
    '#454544',
    '#686867',
    '#898989',
    '#9b9b9b',
    '#afafaf',
    '#dbdcdb',
  ],
  default: [
    '#71a2ff',
    '#c0d4e2',
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
  mcKinseyDeep: [
    '#222667',
    '#2d3386',
    '#5960a4',
    '#7e8cbb',
    '#a5afd3',
    '#c0c9da',
  ],
  mcKinseyLight: [
    '#015f70',
    '#017f95',
    '#029eb7',
    '#53bbc4',
    '#8bccd0',
    '#b1d8d7',
    '#ddeeed',
  ],
};

export const defaultChartBody = {
  elements: [],
};
export const defaultChartFormat = {
  ...defaultItemFormat,
  minWidth: '99px',
  minHeight: '70px',
  palette: chartPaletteKeyValues.default,
  paletteKey: 'default',
  textAlignment: 'left',
  xAxis: true,
  yAxis: true,
  legend: true,
  fraction: 0,
};

export const defaultBarChartFormat = {
  ...defaultChartFormat,
  yAxis: false,
  kind: chartTypes.BAR,
};
export const defaultColumnChartFormat = {
  ...defaultChartFormat,
  kind: chartTypes.COLUMN,
};

export const defaultLineChartFormat = {
  ...defaultChartFormat,
  kind: chartTypes.LINE,
};

export const defaultPieChartFormat = {
  ...defaultChartFormat,
  kind: chartTypes.PIE,
  legend: false,
  mobile: { legend: true },
  tablet: { legend: true },
  units: '%',
};
