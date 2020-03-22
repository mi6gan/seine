// @flow

import type { ChartBody, ChartFormat, ChartType } from '@seine/core';
import { chartTypes } from '@seine/core';

import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from './constants';

const defaultSvgProps = {};

/**
 * @description Use chart format with default values for absent values.
 * @param {ChartType} kind
 * @param {object} chart
 * @returns {object}
 */
export default function useChartSvgProps(
  kind: ChartType,
  chart: {
    ...ChartFormat,
    ...ChartBody,
    ...{ parentType: string },
  }
) {
  switch (kind) {
    case chartTypes.BAR: {
      if (chart.parentType === 'grid') {
        return defaultSvgProps;
      }
      const height =
        (chart.elements.length * VIEWPORT_HEIGHT) /
        Math.max(chart.elements.length, 8);
      return {
        overflow: 'visible',
        viewBox: `0 ${VIEWPORT_HEIGHT - height} ${VIEWPORT_WIDTH} ${height}`,
      };
    }
    case chartTypes.PIE: {
      return {
        overflow: 'visible',
      };
    }
    default:
      return defaultSvgProps;
  }
}
