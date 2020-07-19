// @flow
import * as React from 'react';
import { defaultItemFormat, UPDATE_BLOCK_FORMAT } from '@seine/core';
import { useAutoCallback } from 'hooks.macro';

import SidebarSection from '../ui/SidebarSection';
import {
  useEditorDispatch,
  useEditorSelector,
  useSelectedLayoutItems,
} from '../store';
import SidebarLabel from '../ui/SidebarLabel';
import SidebarInput from '../ui/SidebarInput';
import SidebarGroup from '../ui/SidebarGroup';

/**
 * @description Layout design.
 * @returns {React.Node}
 */
export default function ItemDesign() {
  const device = useEditorSelector((state) => state.device);
  const { item } = useSelectedLayoutItems();
  const dispatch = useEditorDispatch();
  const {
    minWidth = defaultItemFormat.minWidth,
    maxWidth = defaultItemFormat.maxWidth,
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
      </SidebarSection>
    </>
  );
}
