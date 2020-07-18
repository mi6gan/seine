// @flow
import * as React from 'react';
import { Box, FormControl, Input, InputLabel } from '@material-ui/core';
import { defaultItemFormat, UPDATE_BLOCK_FORMAT } from '@seine/core';
import { useAutoCallback } from 'hooks.macro';
import styled from 'styled-components/macro';

import SidebarSection from '../ui/SidebarSection';
import { useEditorDispatch, useSelectedLayoutItems } from '../store';
import SidebarHeading from '../ui/SidebarHeading';

const StyledInput = styled(Input)`
  width: 3rem;
  margin: ${({ theme }) => theme.spacing(0, 1)};
`;

const StyledInputLabel = styled(InputLabel)`
  margin: ${({ theme }) => theme.spacing(0, 1)};
`;

/**
 * @description Layout design.
 * @returns {React.Node}
 */
export default function ItemDesign() {
  const { item } = useSelectedLayoutItems();
  const dispatch = useEditorDispatch();
  const {
    minWidth = defaultItemFormat.minWidth,
    maxWidth = defaultItemFormat.maxWidth,
  } = item ? item.format : defaultItemFormat;
  const id = item && item.id;
  return (
    <>
      <SidebarSection>
        <SidebarHeading>Block</SidebarHeading>
        <Box display={'flex'} alignItems={'flex-end'}>
          <Box component={'label'} mr={2}>
            width
          </Box>
          <FormControl>
            <StyledInputLabel shrink>min</StyledInputLabel>

            <StyledInput
              disabled={!id}
              value={minWidth === 0 ? '' : minWidth}
              onChange={useAutoCallback((event) =>
                dispatch({
                  id,
                  type: UPDATE_BLOCK_FORMAT,
                  format: { minWidth: event.currentTarget.value || 0 },
                })
              )}
            />
          </FormControl>

          <FormControl>
            <StyledInputLabel shrink>max</StyledInputLabel>
            <StyledInput
              disabled={!id}
              value={maxWidth === 'none' ? '' : maxWidth}
              onChange={useAutoCallback((event) =>
                dispatch({
                  id,
                  type: UPDATE_BLOCK_FORMAT,
                  format: { maxWidth: event.currentTarget.value || 'none' },
                })
              )}
            />
          </FormControl>
        </Box>
      </SidebarSection>
    </>
  );
}
