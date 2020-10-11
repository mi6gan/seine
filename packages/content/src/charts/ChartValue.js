// @flow
import * as React from 'react';

type Props = {
  children?: any,
  fraction: number,
};

/**
 * @description Chart formatted value.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartValue({ children: value, fraction = 0 }: Props) {
  return parseFloat(value).toLocaleString('en', {
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction,
  });
}
