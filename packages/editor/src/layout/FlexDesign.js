// @flow
import * as React from 'react';
import {
  blockTypes,
  defaultFlexFormat,
  UPDATE_BLOCK_FORMAT,
} from '@seine/core';
import {
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  VerticalAlignBottom,
  VerticalAlignCenter,
  VerticalAlignTop,
} from '@material-ui/icons';
import { useAutoCallback } from 'hooks.macro';

import {
  useEditorDispatch,
  useEditorSelector,
  useSelectedBlocks,
} from '../store';
import SidebarLabel from '../ui/SidebarLabel';
import SidebarInput from '../ui/SidebarInput';
import SidebarGroup from '../ui/SidebarGroup';
import ToolbarToggleButtonGroup from '../ui/ToolbarToggleButtonGroup';
import ToolbarToggleButton from '../ui/ToolbarToggleButton';

/**
 * @description Layout design.
 * @returns {React.Node}
 */
export default function FlexDesign() {
  const device = useEditorSelector((state) => state.device);
  const layoutBlock = useSelectedBlocks().find(
    ({ type }) => type === blockTypes.LAYOUT
  );
  const dispatch = useEditorDispatch();
  const id = layoutBlock && layoutBlock.id;
  const {
    spacing = defaultFlexFormat.spacing,
    justify = defaultFlexFormat.justify,
    alignItems = defaultFlexFormat.alignItems,
  } = layoutBlock
    ? layoutBlock.format[device] || layoutBlock.format || defaultFlexFormat
    : defaultFlexFormat;
  return (
    <>
      <SidebarGroup alignItems={'center'}>
        <SidebarLabel>Spacing</SidebarLabel>
        <SidebarInput
          value={spacing}
          onChange={useAutoCallback(({ currentTarget }) => {
            dispatch({
              type: UPDATE_BLOCK_FORMAT,
              id,
              format: { spacing: +currentTarget.value },
            });
          })}
          type={'number'}
          inputProps={{ min: 0, max: 10 }}
        />
      </SidebarGroup>

      <SidebarGroup alignItems={'center'}>
        <SidebarLabel>Justify</SidebarLabel>
        <ToolbarToggleButtonGroup
          value={justify}
          onChange={useAutoCallback((event, justify) =>
            dispatch({ type: UPDATE_BLOCK_FORMAT, format: { justify } })
          )}
        >
          <ToolbarToggleButton value={'flex-start'}>
            <FormatAlignLeft />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'center'}>
            <FormatAlignCenter />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'flex-end'}>
            <FormatAlignRight />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'space-between'}>
            <FormatAlignJustify />
          </ToolbarToggleButton>
        </ToolbarToggleButtonGroup>
      </SidebarGroup>

      <SidebarGroup alignItems={'center'}>
        <SidebarLabel>Align</SidebarLabel>
        <ToolbarToggleButtonGroup
          value={alignItems}
          onChange={useAutoCallback((event, alignItems) =>
            dispatch({ type: UPDATE_BLOCK_FORMAT, format: { alignItems } })
          )}
        >
          <ToolbarToggleButton value={'flex-start'}>
            <VerticalAlignTop />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'center'}>
            <VerticalAlignCenter />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'flex-end'}>
            <VerticalAlignBottom />
          </ToolbarToggleButton>
        </ToolbarToggleButtonGroup>
      </SidebarGroup>
    </>
  );
}
