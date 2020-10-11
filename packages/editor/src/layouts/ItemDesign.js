// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import useSelectedLayoutItems from './useSelectedLayoutItems';

import { defaultItemFormat, UPDATE_BLOCK_FORMAT } from '@seine/core';
import {
  SidebarSection,
  useBlocksDispatch,
  useBlocksSelector,
  SidebarLabel,
  SidebarInput,
  SidebarGroup,
} from '@seine/editor';

/**
 * @description Layout design.
 * @returns {React.Node}
 */
export default function ItemDesign() {
  const device = useBlocksSelector((state) => state.device);
  const { item } = useSelectedLayoutItems();
  const dispatch = useBlocksDispatch();
  const {
    minWidth = defaultItemFormat.minWidth,
    maxWidth = defaultItemFormat.maxWidth,
    minHeight = defaultItemFormat.minHeight,
    maxHeight = defaultItemFormat.maxHeight,
  } =
    (item && item.format && (item.format[device] || item.format)) ||
    defaultItemFormat;
  const id = item && item.id;
  return (
    <>
      <SidebarSection>
        <SidebarGroup>
          <SidebarLabel>width</SidebarLabel>
          <SidebarInput
            inputProps={{ placeholder: 'min' }}
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
          <SidebarInput
            inputProps={{ placeholder: 'max' }}
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
        </SidebarGroup>
        <SidebarGroup>
          <SidebarLabel>height</SidebarLabel>
          <SidebarInput
            inputProps={{ placeholder: 'min' }}
            disabled={!id}
            value={minHeight === 0 ? '' : minHeight}
            onChange={useAutoCallback((event) =>
              dispatch({
                id,
                type: UPDATE_BLOCK_FORMAT,
                format: { minHeight: event.currentTarget.value || 0 },
              })
            )}
          />
          <SidebarInput
            inputProps={{ placeholder: 'max' }}
            disabled={!id}
            value={maxHeight === 'none' ? '' : maxHeight}
            onChange={useAutoCallback((event) =>
              dispatch({
                id,
                type: UPDATE_BLOCK_FORMAT,
                format: { maxHeight: event.currentTarget.value || 'none' },
              })
            )}
          />
        </SidebarGroup>
      </SidebarSection>
    </>
  );
}
