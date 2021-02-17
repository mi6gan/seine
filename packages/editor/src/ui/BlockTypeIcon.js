// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { useAutoMemo } from 'hooks.macro';

import {
  BarChart as ColumnChartIcon,
  Crop54 as RectShapeIcon,
  Description as PageIcon,
  Image as ImageIcon,
  LinearScale as PathShapeIcon,
  Lock as LockIcon,
  PieChart,
  RadioButtonUnchecked as EllipseShapeIcon,
  ShowChart as LineChart,
  TableChart as TableIcon,
  Title as RichTextIcon,
  ViewCompact as LayoutIcon,
  Wallpaper as RootShapeIcon,
} from '@seine/styles/mui-icons.macro';
import type { BlockType } from '@seine/core';
import { blockTypes, chartTypes, shapeTypes } from '@seine/core';

type Props = {
  type: BlockType,
};

const BarChartIcon = styled(ColumnChartIcon).attrs({
  transform: 'rotate(90)',
})``;

const LockContainer = styled.div`
  svg:last-of-type {
    position: relative;
    font-size: 0.7rem;
    left: -0.35rem;
    color: ${({ theme }) => theme.palette.error.main};
  }
`;

/**
 * @description Block type icon.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BlockTypeIcon({ type, kind, ...iconProps }: Props) {
  const iconType = type.replace(/^.+\//, '');
  const Icon = useAutoMemo(() => {
    switch (iconType) {
      case blockTypes.PAGE:
        return PageIcon;

      case blockTypes.TABLE:
        return TableIcon;

      case blockTypes.CHART:
        switch (kind) {
          case chartTypes.BAR:
            return BarChartIcon;
          case chartTypes.COLUMN:
            return ColumnChartIcon;
          case chartTypes.LINE:
            return LineChart;
          case chartTypes.PIE:
            return PieChart;
          default:
            return null;
        }

      case blockTypes.SHAPE:
        switch (kind) {
          case shapeTypes.PATH:
            return PathShapeIcon;
          case shapeTypes.RECT:
            return RectShapeIcon;
          case shapeTypes.ELLIPSE:
            return EllipseShapeIcon;
          case shapeTypes.ROOT:
          case shapeTypes.GROUP:
            return RootShapeIcon;
          default:
            return null;
        }

      case blockTypes.RICH_TEXT:
        return RichTextIcon;

      case blockTypes.LAYOUT:
        return LayoutIcon;

      case blockTypes.IMAGE:
        return ImageIcon;

      default:
        return null;
    }
  });
  return (
    Icon &&
    (type === iconType ? (
      <Icon {...iconProps} />
    ) : (
      <LockContainer>
        <Icon {...iconProps} />
        <LockIcon />
      </LockContainer>
    ))
  );
}
