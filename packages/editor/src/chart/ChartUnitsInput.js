// @flow
import * as React from 'react';
import type {
  BlockId,
  BlocksAction,
  ChartBody,
  ChartFormat,
} from '@seine/core';
import { UPDATE_BLOCK_FORMAT } from '@seine/core';
import { defaultChartFormat, defaultChartUnits } from '@seine/content';
import styled from 'styled-components/macro';
import { TextField } from '@material-ui/core';

type Props = {
  body: ChartBody,
  dispatch: (BlocksAction) => any,
  format: ChartFormat,
  id: BlockId,
};

const Input = styled(TextField)`
  && {
    max-width: 4em;
  }
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
    <Input
      onChange={React.useCallback(
        ({ currentTarget }) =>
          dispatch({
            type: UPDATE_BLOCK_FORMAT,
            format: { units: currentTarget.value },
          }),
        [dispatch]
      )}
      InputProps={{
        placeholder: 'units',
      }}
      margin={'dense'}
      value={units}
    />
  );
}
