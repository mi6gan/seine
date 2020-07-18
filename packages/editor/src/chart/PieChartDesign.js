// @flow
import * as React from 'react';
import { Box, Input } from '@material-ui/core';
import { blockTypes, UPDATE_BLOCK_FORMAT } from '@seine/core';
import { defaultPieChartFormat } from '@seine/content';
import { useAutoCallback } from 'hooks.macro';
import styled from 'styled-components/macro';

import { useEditorDispatch, useSelectedBlocks } from '../store';

const StyledInput = styled(Input)`
  width: 3rem;
  margin: ${({ theme }) => theme.spacing(0, 1)};
`;

/**
 * @description Pie chart design panel.
 * @returns {React.Node}
 */
export default function PieChartDesign() {
  const {
    id,
    format: { units = defaultPieChartFormat.units },
  } = useSelectedBlocks().find(({ type }) => type === blockTypes.CHART) || {};
  const dispatch = useEditorDispatch();
  return (
    <>
      <Box display={'flex'} alignItems={'flex-end'}>
        <Box component={'label'} mr={2}>
          units
        </Box>

        <StyledInput
          disabled={!id}
          value={units}
          onChange={useAutoCallback((event) =>
            dispatch({
              id,
              type: UPDATE_BLOCK_FORMAT,
              format: { units: event.currentTarget.value },
            })
          )}
        />
      </Box>
    </>
  );
}
