// @flow

import type { ChartType } from '@seine/core';
import { chartTypes } from '@seine/core';

const defaultSvgProps = {};

/**
 * @description Use chart format with default values for absent values.
 * @param {ChartType} kind
 * @returns {object}
 */
export default function useChartSvgProps(kind: ChartType) {
  switch (kind) {
    case chartTypes.PIE: {
      return {
        overflow: 'visible',
      };
    }
    default:
      return defaultSvgProps;
  }
}
