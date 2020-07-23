import { chartTypes, initialElementsState } from '@seine/core';

export const defaultChartDy = 10;
export const defaultChartDx = 10;
export const defaultChartPalette = [
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
];
export const defaultChartMinValue = 0;
export const defaultChartUnits = '';
export const defaultChartXAxis = true;
export const defaultChartYAxis = true;

export const chartPaletteMcKinseyDeep = [
  '#222667',
  '#2d3386',
  '#5960a4',
  '#7e8cbb',
  '#a5afd3',
  '#c0c9da',
];

export const chartPaletteMcKinseyLight = [
  '#015f70',
  '#017f95',
  '#029eb7',
  '#53bbc4',
  '#8bccd0',
  '#b1d8d7',
  '#ddeeed',
];

export const chartPaletteBCG = [
  '#1b591d',
  '#247727',
  '#29a147',
  '#2db851',
  '#7fc791',
  '#aad296',
  '#daebd1',
];

export const chartPaletteBlack = [
  '#343433',
  '#454544',
  '#686867',
  '#898989',
  '#9b9b9b',
  '#afafaf',
  '#dbdcdb',
];

export const chartPaletteKeyValues = {
  bcg: chartPaletteBCG,
  black: chartPaletteBlack,
  default: defaultChartPalette,
  mcKinseyDeep: chartPaletteMcKinseyDeep,
  mcKinseyLight: chartPaletteMcKinseyLight,
};

export const defaultChartPaletteKey = 'default';
export const defaultChartBody = {
  elements: [],
};
export const defaultChartEditor = { selection: initialElementsState.selection };
export const defaultChartTextAlignment = 'left';
export const defaultChartLegend = true;
export const defaultPieChartLegend = false;
export const defaultChartFraction = 0;
export const defaultChartHeight = 100;

export const defaultChartFormat = {
  palette: defaultChartPalette,
  paletteKey: defaultChartPaletteKey,
  textAlignment: defaultChartTextAlignment,
  xAxis: defaultChartXAxis,
  yAxis: defaultChartYAxis,
  legend: defaultChartLegend,
  fraction: defaultChartFraction,
};

export const defaultBarChartFormat = {
  ...defaultChartFormat,
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

export const defaultPieChartUnits = '%';

export const defaultPieChartFormat = {
  ...defaultChartFormat,
  kind: chartTypes.PIE,
  legend: defaultPieChartLegend,
  units: defaultPieChartUnits,
};

export const VIEWPORT_WIDTH = 297;
export const VIEWPORT_HEIGHT = 210;
