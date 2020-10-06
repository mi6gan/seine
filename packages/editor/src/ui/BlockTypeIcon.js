// @flow
import * as React from 'react';
import {
  BarChart as ColumnChartIcon,
  TableChart as TableIcon,
  ShowChart as LineChart,
  PieChart,
  Title as RichTextIcon,
  ViewCompact as LayoutIcon,
} from '@material-ui/icons';
import styled from 'styled-components/macro';

import type { BlockType } from '@seine/core';
import { blockTypes, chartTypes } from '@seine/core';

type Props = {
  type: BlockType,
};

const BarChartIcon = styled(ColumnChartIcon).attrs({
  transform: 'rotate(90)',
})``;

/**
 * @description Block type icon.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BlockTypeIcon({ type, kind }: Props) {
  switch (type) {
    case blockTypes.TABLE:
      return <TableIcon />;

    case blockTypes.CHART:
      switch (kind) {
        case chartTypes.BAR:
          return <BarChartIcon />;
        case chartTypes.COLUMN:
          return <ColumnChartIcon />;
        case chartTypes.LINE:
          return <LineChart />;
        case chartTypes.PIE:
          return <PieChart />;
        default:
          return null;
      }

    case blockTypes.RICH_TEXT:
      return <RichTextIcon />;

    case blockTypes.LAYOUT:
      return <LayoutIcon />;

    default:
      return null;
  }
}
