// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import {
  SidebarSelectLabel,
  SidebarGroup,
  SidebarHeading,
  SidebarLabel,
  SidebarSection,
} from '../ui';
import { useBlocksDispatch, useBlocksSelector } from '../contexts';

import { FlexDesign, useSelectedLayoutItems } from '.';

import { MenuItem, Select } from '@seine/styles/mui-core.macro';
import {
  defaultLayoutFormat,
  layoutTypes,
  UPDATE_BLOCK_FORMAT,
} from '@seine/core';

/**
 * @description Flex layout design.
 * @returns {React.Node}
 */
export default function LayoutDesign() {
  const { layout: layoutBlock } = useSelectedLayoutItems();
  const device = useBlocksSelector((state) => state.device);
  const id = layoutBlock && layoutBlock.id;
  const { kind = defaultLayoutFormat.kind } =
    layoutBlock && layoutBlock.format
      ? layoutBlock.format[device] || layoutBlock.format
      : defaultLayoutFormat;
  const dispatch = useBlocksDispatch();
  return (
    <>
      <SidebarSection>
        <SidebarHeading>Layout</SidebarHeading>

        <SidebarGroup>
          <SidebarLabel>type</SidebarLabel>
          <Select
            value={kind}
            onChange={useAutoCallback((e) =>
              dispatch({
                id,
                type: UPDATE_BLOCK_FORMAT,
                format: { kind: e.target.value },
              })
            )}
          >
            <MenuItem value={layoutTypes.FLEX}>
              <SidebarSelectLabel>flex</SidebarSelectLabel>
            </MenuItem>
            <MenuItem value={layoutTypes.GRID}>
              <SidebarSelectLabel>grid</SidebarSelectLabel>
            </MenuItem>
          </Select>
        </SidebarGroup>

        {kind === layoutTypes.FLEX && <FlexDesign />}
      </SidebarSection>
    </>
  );
}
