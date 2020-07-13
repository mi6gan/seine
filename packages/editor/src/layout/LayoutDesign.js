// @flow
import * as React from 'react';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import { blockTypes, UPDATE_BLOCK_LAYOUT } from '@seine/core';
import { useAutoCallback } from 'hooks.macro';

import SidebarHeading from '../ui/SidebarHeading';
import SidebarSection from '../ui/SidebarSection';
import { useEditorDispatch, useSelectedBlocks } from '../store';

import FlexDesign from './FlexDesign';

/**
 * @description Flex layout design.
 * @returns {React.Node}
 */
export default function LayoutDesign() {
  const layoutBlock = useSelectedBlocks().find(
    ({ type }) => type === blockTypes.FLEX || type === blockTypes.GRID
  );
  const id = layoutBlock && layoutBlock.id;
  const type = layoutBlock && layoutBlock.type;
  const dispatch = useEditorDispatch();
  return (
    <>
      <SidebarHeading>Layout</SidebarHeading>

      <SidebarSection>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            onChange={useAutoCallback((e) =>
              dispatch({
                id,
                type: UPDATE_BLOCK_LAYOUT,
                layout: e.target.value,
              })
            )}
          >
            <option value={blockTypes.FLEX}>Flex</option>
            <option value={blockTypes.GRID}>Grid</option>
          </Select>
        </FormControl>
      </SidebarSection>

      {type === blockTypes.FLEX && <FlexDesign />}
    </>
  );
}
