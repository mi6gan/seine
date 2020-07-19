// @flow
import * as React from 'react';
import { MenuItem, Select } from '@material-ui/core';
import {
  blockTypes,
  defaultLayoutFormat,
  layoutTypes,
  UPDATE_BLOCK_FORMAT,
} from '@seine/core';
import { useAutoCallback } from 'hooks.macro';

import SidebarHeading from '../ui/SidebarHeading';
import {
  useEditorDispatch,
  useEditorSelector,
  useSelectedBlocks,
} from '../store';
import SidebarLabel from '../ui/SidebarLabel';
import SidebarGroup from '../ui/SidebarGroup';
import SidebarSection from '../ui/SidebarSection';

import FlexDesign from './FlexDesign';

/**
 * @description Flex layout design.
 * @returns {React.Node}
 */
export default function LayoutDesign() {
  const device = useEditorSelector((state) => state.device);
  const layoutBlock = useSelectedBlocks().find(
    ({ type }) => type === blockTypes.LAYOUT
  );
  const id = layoutBlock && layoutBlock.id;
  const { kind = defaultLayoutFormat.kind } = layoutBlock
    ? layoutBlock.format[device] || layoutBlock.format
    : defaultLayoutFormat;
  const dispatch = useEditorDispatch();
  return (
    <SidebarSection>
      <SidebarHeading>Layout</SidebarHeading>

      <SidebarGroup alignItems={'center'}>
        <SidebarLabel>Type</SidebarLabel>
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
          <MenuItem value={layoutTypes.FLEX}>Flex</MenuItem>
          <MenuItem value={layoutTypes.GRID}>Grid</MenuItem>
        </Select>
      </SidebarGroup>

      {kind === layoutTypes.FLEX && <FlexDesign />}
    </SidebarSection>
  );
}
