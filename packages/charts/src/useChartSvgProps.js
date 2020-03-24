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
      return {
        overflow: 'visible',
        viewBox: `0 0 ${VIEWPORT_WIDTH} ${VIEWPORT_HEIGHT}`,
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
