// @flow
import * as React from 'react';

import type { BlockType, ChartType } from '@seine/core';
import { blockTypes, chartTypes } from '@seine/core';

type Props = {
  type: BlockType,
  kind: ChartType,
};

/**
 * @description Block type icon.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BlockTypeName({ type, kind }: Props) {
  switch (type) {
    case blockTypes.PAGE:
      return 'document';

    case blockTypes.TABLE:
      return 'table';

    case blockTypes.CHART:
      switch (kind) {
        case chartTypes.BAR:
          return 'bar chart';
        case chartTypes.COLUMN:
          return 'column chart';
        case chartTypes.LINE:
          return 'line chart';
        case chartTypes.PIE:
          return 'pie chart';
        default:
          return null;
      }

    case blockTypes.RICH_TEXT:
      return 'text';

    case blockTypes.LAYOUT:
      return 'layout';

    case blockTypes.IMAGE:
      return 'image';

    default:
      return null;
  }
}
