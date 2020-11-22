// @flow
import {
  defaultChartHeight,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from './constants';
import type { ChartProps } from './types';

import type { ChartType } from '@seine/core';
import { chartTypes } from '@seine/core';

const defaultSvgProps = {};

/**
 * @description Use chart format with default values for absent values.
 * @param {ChartType} kind
 * @param {ChartProps} chartProps
 * @returns {object}
 */
export default function useChartSvgProps(
  kind: ChartType,
  chartProps: ChartProps
) {
  const { height = defaultChartHeight } = chartProps;
  const maxHeight = `calc(${height}vh - 25%)`;

  switch (kind) {
    case chartTypes.PIE: {
      return {
        maxHeight,
        overflow: 'visible',
      };
    }
    case chartTypes.BAR: {
      if (chartProps.parentType !== 'grid') {
        return {
          maxHeight,
          viewBox: `0 0 ${VIEWPORT_WIDTH} ${VIEWPORT_HEIGHT +
            (VIEWPORT_HEIGHT * Math.max(0, chartProps.elements.length - 5)) /
              4}`,
        };
      }
      return {
        maxHeight,
        ...defaultSvgProps,
      };
    }
    default:
      return {
        maxHeight,
        defaultSvgProps,
      };
  }
}
