// @flow
import * as React from 'react';
import { blockTypes, chartTypes } from '@seine/core';

import { useSelectedBlocks } from '../store';

import PieChartDesign from './PieChartDesign';
import BarChartDesign from './BarChartDesign';
import LineChartDesign from './LineChartDesign';
import ColumnChartDesign from './ColumnChartDesign';

/**
 * @description Chart design panel.
 * @returns {React.Node}
 */
export default function ChartDesign() {
  const {
    format: { kind },
  } = useSelectedBlocks().find(({ type }) => type === blockTypes.CHART) || {};
  return (
    <>
      {kind === chartTypes.PIE && <PieChartDesign />}
      {kind === chartTypes.BAR && <BarChartDesign />}
      {kind === chartTypes.LINE && <LineChartDesign />}
      {kind === chartTypes.COLUMN && <ColumnChartDesign />}
    </>
  );
}
