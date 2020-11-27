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
import { useBlocksDispatch } from '../blocks';

import useSelectedLayoutItems from './useSelectedLayoutItems';
import GridDesign from './GridDesign';
import FlexDesign from './FlexDesign';

import { layoutTypes, UPDATE_BLOCK_FORMAT } from '@seine/core';

// eslint-disable-next-line
const LayoutDesign = React.forwardRef(function LayoutDesign(props, ref) {
  const { selectAs: Select = SidebarSelect } = props;
  const {
    layout: {
      id,
      format: { kind },
    },
  } = useSelectedLayoutItems();
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
