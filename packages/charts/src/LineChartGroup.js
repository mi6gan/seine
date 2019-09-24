// @flow
import * as React from 'react';

export type Props = {
  fontSize: number,
  fontWeight: number,
  group: string,
  height: number,
  lineHeight: number,
  width: number,
  x: number,
  y: number,
};

/**
 * @description Group text of line chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function LineChartGroup({
  fontSize,
  fontWeight,
  group,
  x,
  y,
}: Props) {
  return (
    <text
      fontSize={fontSize}
      fontWeight={fontWeight}
      textAnchor={'middle'}
      x={x}
      y={y}
    >
      {group}
    </text>
  );
}
