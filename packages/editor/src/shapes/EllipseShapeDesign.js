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
export default function EllipseShapeDesign() {
  const {
    item: {
      id,
      format: { cx, cy, rx, ry },
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
      <SidebarHeading>Chart</SidebarHeading>
      <SidebarGroup>
        <SidebarLabel>cx</SidebarLabel>
        <SidebarInput
          disabled={!id}
          value={cx}
          name={'cx'}
          onChange={formatInput}
          type={'number'}
        />
        <SidebarLabel>cy</SidebarLabel>
        <Box display={'flex'}>
          <SidebarInput
            disabled={!id}
            value={cy}
            name={'cy'}
            onChange={formatInput}
            type={'number'}
          />
        </Box>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarLabel>rx</SidebarLabel>
        <SidebarInput
          disabled={!id}
          value={rx}
          name={'rx'}
          onChange={formatInput}
          type={'number'}
        />
        <SidebarLabel>ry</SidebarLabel>
        <Box display={'flex'}>
          <SidebarInput
            disabled={!id}
            value={ry}
            name={'ry'}
            onChange={formatInput}
            type={'number'}
          />
        </Box>
      </SidebarGroup>
    </SidebarSection>
  );
}
