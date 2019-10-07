// @flow
import * as React from 'react';
import { Input } from '@seine/ui';
import type {
  BlockId,
  BlocksAction,
  ChartBody,
  ChartFormat,
} from '@seine/core';
import { UPDATE_BLOCK_FORMAT } from '@seine/core';
import { defaultChartFormat, defaultChartUnits } from '@seine/charts';
import styled from 'styled-components';

type Props = {
  body: ChartBody,
  dispatch: (BlocksAction) => any,
  format: ChartFormat,
  id: BlockId,
};

const StyledInput = styled(Input)`
  max-width: 4em;
`;

/**
 * @description Input that changes minimum value (of y axis).
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartUnitsInput({
  dispatch,
  format: { units = defaultChartUnits } = defaultChartFormat,
}: Props) {
  return (
    <StyledInput
      onChange={React.useCallback(
        ({ currentTarget }) =>
          dispatch({
            type: UPDATE_BLOCK_FORMAT,
            format: { units: currentTarget.value },
          }),
        [dispatch]
      )}
      placeholder={'units'}
      value={units}
    />
  );
}
