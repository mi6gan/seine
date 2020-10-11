// @flow
import * as React from 'react';

type Props = {
  children?: any,
};

/**
 * @description Svg definitions for charts visualization.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartSvgDefs({ children = null }: Props) {
  return (
    <defs>
      <pattern
        id="selectionPattern"
        width="2"
        height="2"
        patternUnits="userSpaceOnUse"
      >
        <circle
          cx="1"
          cy="1"
          r="0.5"
          fill="black"
          stroke="none"
          strokeWidth="0"
        />
        <circle r="0.5" fill="black" stroke="none" strokeWidth="0" />
        <circle cy="2" r="0.5" fill="black" stroke="none" strokeWidth="0" />
        <circle
          cx="2"
          cy="2"
          r="0.5"
          fill="black"
          stroke="none"
          strokeWidth="0"
        />
        <circle cx="2" r="0.5" fill="black" stroke="none" strokeWidth="0" />
      </pattern>

      <marker id="arrowUpMarker" overflow="visible" orient="auto">
        <path
          d="m0 0 6-6-24 6 24 6-6-6z"
          fill="#000000"
          fillRule="evenodd"
          stroke="#000000"
        />
      </marker>
      {children}
    </defs>
  );
}
