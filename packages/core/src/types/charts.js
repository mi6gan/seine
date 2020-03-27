// @flow
import type { RichTextFormat } from './richText';

export const CHART = 'chart';
export const chartTypes = {
  BAR: 'bar',
  COLUMN: 'column',
  PIE: 'pie',
  LINE: 'line',
};

export type ChartType = $Values<typeof chartTypes>;

export type ChartFormat = RichTextFormat & {
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
