// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import {
  SidebarGroup,
  SidebarHeading,
  SidebarLabel,
  SidebarSection,
  SidebarSelect,
} from '../ui';
import { useBlocksDispatch, useEditorSelector } from '../blocks';

import useSelectedLayoutItems from './useSelectedLayoutItems';
import GridDesign from './GridDesign';
import FlexDesign from './FlexDesign';

import {
  defaultLayoutFormat,
  layoutTypes,
  UPDATE_BLOCK_FORMAT,
} from '@seine/core';

// eslint-disable-next-line
const LayoutDesign = React.forwardRef(function LayoutDesign(props, ref) {
  const {
    defaults = defaultLayoutFormat,
    selectAs: Select = SidebarSelect,
  } = props;
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
            name={'kind'}
            native
            onChange={useAutoCallback((e) => {
              dispatch({
                id,
                type: UPDATE_BLOCK_FORMAT,
                format: { kind: `${e.target.value}` },
              });
            })}
          >
            <option value={layoutTypes.FLEX}>flex</option>
            <option value={layoutTypes.GRID}>grid</option>
          </Select>
        </SidebarGroup>

        {kind === layoutTypes.FLEX && <FlexDesign {...props} />}
        {kind === layoutTypes.GRID && <GridDesign {...props} />}
      </SidebarSection>
    </>
  );
});

export default LayoutDesign;
