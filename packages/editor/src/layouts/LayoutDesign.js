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
import { useBlocksDispatch, useEditorSelector } from '../blocks';

import useSelectedLayoutItems from './useSelectedLayoutItems';
import GridDesign from './GridDesign';
import FlexDesign from './FlexDesign';

import { MenuItem, Select } from '@seine/styles/mui-core.macro';
import {
  defaultLayoutFormat,
  layoutTypes,
  UPDATE_BLOCK_FORMAT,
} from '@seine/core';

// eslint-disable-next-line
const LayoutDesign = React.forwardRef(function LayoutDesign(
  { defaults = defaultLayoutFormat, ...props },
  ref
) {
  const { layout: layoutBlock } = useSelectedLayoutItems();
  const device = useEditorSelector((state) => state.device);
  const id = layoutBlock && layoutBlock.id;
  const { kind = defaults.kind } =
    layoutBlock && layoutBlock.format
      ? layoutBlock.format[device] || layoutBlock.format
      : defaults;
  const dispatch = useBlocksDispatch();
  return (
    <>
      <SidebarSection ref={ref}>
        <SidebarHeading>Layout</SidebarHeading>

        <SidebarGroup>
          <SidebarLabel>type</SidebarLabel>
          <Select
            value={kind}
            onChange={useAutoCallback((e) => {
              dispatch({
                id,
                type: UPDATE_BLOCK_FORMAT,
                format: { kind: `${e.target.value}` },
              });
            })}
          >
            <MenuItem value={layoutTypes.FLEX}>
              <SidebarSelectLabel>flex</SidebarSelectLabel>
            </MenuItem>
            <MenuItem value={layoutTypes.GRID}>
              <SidebarSelectLabel>grid</SidebarSelectLabel>
            </MenuItem>
          </Select>
        </SidebarGroup>

        {kind === layoutTypes.FLEX && <FlexDesign {...props} />}
        {kind === layoutTypes.GRID && <GridDesign {...props} />}
      </SidebarSection>
    </>
  );
});

export default LayoutDesign;
