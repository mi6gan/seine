// @flow
import * as React from 'react';
import { FormControl, InputLabel, Select } from '@material-ui/core';
import {
  blockTypes,
  defaultLayoutFormat,
  layoutTypes,
  UPDATE_BLOCK_FORMAT,
} from '@seine/core';
import { useAutoCallback } from 'hooks.macro';

import SidebarHeading from '../ui/SidebarHeading';
import SidebarSection from '../ui/SidebarSection';
import {
  useEditorDispatch,
  useEditorSelector,
  useSelectedBlocks,
} from '../store';

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
    <>
      <SidebarHeading>Layout</SidebarHeading>

      <SidebarSection>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
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
            <option value={layoutTypes.FLEX}>Flex</option>
            <option value={layoutTypes.GRID}>Grid</option>
          </Select>
        </FormControl>
      </SidebarSection>

      {kind === layoutTypes.FLEX && <FlexDesign />}
    </>
  );
}
