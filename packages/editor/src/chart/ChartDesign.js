// @flow
import * as React from 'react';
import { chartTypes } from '@seine/core';

import PieChartDesign from './PieChartDesign';
import BarChartDesign from './BarChartDesign';
import LineChartDesign from './LineChartDesign';
import ColumnChartDesign from './ColumnChartDesign';
import useChartBlock from './useChartBlock';

/**
 * @description Chart design panel.
 * @returns {React.Node}
 */
export default function ChartDesign() {
  const {
    format: { kind },
  } = useChartBlock();
  return (
    <>
      {kind === chartTypes.PIE && <PieChartDesign />}
      {kind === chartTypes.BAR && <BarChartDesign />}
      {kind === chartTypes.LINE && <LineChartDesign />}
      {kind === chartTypes.COLUMN && <ColumnChartDesign />}
    </>
  );
}
