// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import {
  SidebarGroup,
  SidebarHeading,
  SidebarInput,
  SidebarLabel,
  SidebarSection,
} from '../ui';
import { useBlocksDispatch } from '../blocks';
import { useSelectedLayoutItems } from '../layouts';

import { Box } from '@seine/styles';
import { UPDATE_BLOCK_FORMAT } from '@seine/core';

/**
 * @description Chart design panel.
 * @returns {React.Node}
 */
export default function RectShapeDesign() {
  const {
    item: {
      id,
      format: { x, y, width, height },
    },
  } = useSelectedLayoutItems();
  const dispatch = useBlocksDispatch();
  const formatInput = useAutoCallback(
    ({ currentTarget: { value, name, type } }) => {
      dispatch({
        id,
        type: UPDATE_BLOCK_FORMAT,
        format: { [name]: type === 'number' ? +value : value },
      });
    }
  );
  return (
    <SidebarSection>
      <SidebarHeading>Rectangle</SidebarHeading>
      <SidebarGroup>
        <SidebarLabel minWidth={'auto'} mr={1}>
          x
        </SidebarLabel>
        <SidebarInput
          disabled={!id}
          value={x}
          name={'x'}
          onChange={formatInput}
          type={'number'}
        />
        <SidebarLabel minWidth={'auto'} mr={1}>
          width
        </SidebarLabel>
        <SidebarInput
          disabled={!id}
          value={width}
          name={'width'}
          onChange={formatInput}
          type={'number'}
        />
      </SidebarGroup>
      <SidebarGroup>
        <SidebarLabel minWidth={'auto'} mr={1}>
          y
        </SidebarLabel>
        <Box display={'flex'}>
          <SidebarInput
            disabled={!id}
            value={y}
            name={'y'}
            onChange={formatInput}
            type={'number'}
          />
        </Box>
        <SidebarLabel minWidth={'auto'} mr={1}>
          height
        </SidebarLabel>
        <Box display={'flex'}>
          <SidebarInput
            disabled={!id}
            value={height}
            name={'height'}
            onChange={formatInput}
            type={'number'}
          />
        </Box>
      </SidebarGroup>
    </SidebarSection>
  );
}
