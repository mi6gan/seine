// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';
import styled from 'styled-components/macro';
import { ToggleButton } from '@material-ui/lab';

import {
  SidebarGroup,
  SidebarHeading,
  SidebarInput,
  SidebarLabel,
  SidebarSection,
  ToolbarToggleButtonGroup,
} from '../ui';
import { useBlocksDispatch, useBlocksSelector } from '../contexts';

import { useSelectedLayoutItems } from '.';

import {
  BorderBottom as PositionBottom,
  BorderInner as PositionCenter,
  BorderLeft as PositionLeft,
  BorderRight as PositionRight,
  BorderStyle as PositionLeftTop,
  BorderTop as PositionTop,
} from '@seine/styles/mui-icons.macro';
import { Box } from '@seine/styles/mui-core.macro';
import { defaultItemFormat, UPDATE_BLOCK_FORMAT } from '@seine/core';

const PositionRightTop = styled(PositionLeftTop)`
  transform: scaleX(-1);
`;

const PositionLeftBottom = styled(PositionLeftTop)`
  transform: scaleY(-1);
`;

const PositionRightBottom = styled(PositionLeftTop)`
  transform: scale(-1);
`;

const PositionToggleButton = styled(ToggleButton)`
  &&& {
    color: currentColor;
    border: none;
    padding: 0;
    ${({ value }) =>
      value.startsWith('center')
        ? { borderRadius: 0 }
        : value.startsWith('flex-end')
        ? {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }
        : {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
`;

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
    alignSelf = defaultItemFormat.alignSelf,
    justifySelf = defaultItemFormat.justifySelf,
  } =
    (item && item.format && (item.format[device] || item.format)) ||
    defaultItemFormat;
  const id = item && item.id;
  const togglePosition = useAutoCallback((event, value) => {
    const [
      justifySelf = defaultItemFormat.justifySelf,
      alignSelf = defaultItemFormat.alignSelf,
    ] = value ? value.split(' ') : [];
    dispatch({
      id,
      type: UPDATE_BLOCK_FORMAT,
      format: {
        justifySelf,
        alignSelf,
      },
    });
  });
  const position = `${justifySelf} ${alignSelf}`;
  return (
    <>
      <SidebarSection>
        <SidebarHeading>Constraints</SidebarHeading>

        <SidebarGroup mb={2}>
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

        <SidebarGroup mb={2}>
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

        <SidebarGroup>
          <SidebarLabel>position</SidebarLabel>

          <Box display={'flex'} flexDirection={'column'}>
            <ToolbarToggleButtonGroup
              value={position}
              onChange={togglePosition}
              mb={0}
            >
              <PositionToggleButton value={'flex-start flex-start'}>
                <PositionLeftTop />
              </PositionToggleButton>

              <PositionToggleButton value={'center flex-start'}>
                <PositionTop />
              </PositionToggleButton>

              <PositionToggleButton value={'flex-end flex-start'}>
                <PositionRightTop />
              </PositionToggleButton>
            </ToolbarToggleButtonGroup>

            <ToolbarToggleButtonGroup
              my={0}
              value={position}
              onChange={togglePosition}
            >
              <PositionToggleButton value={'flex-start center'}>
                <PositionLeft />
              </PositionToggleButton>

              <PositionToggleButton value={'center center'}>
                <PositionCenter />
              </PositionToggleButton>

              <PositionToggleButton value={'flex-end center'}>
                <PositionRight />
              </PositionToggleButton>
            </ToolbarToggleButtonGroup>

            <ToolbarToggleButtonGroup
              mt={0}
              position={'relative'}
              value={position}
              onChange={togglePosition}
            >
              <PositionToggleButton value={'flex-start flex-end'}>
                <PositionLeftBottom />
              </PositionToggleButton>

              <PositionToggleButton value={'center flex-end'}>
                <PositionBottom />
              </PositionToggleButton>

              <PositionToggleButton value={'flex-end flex-end'}>
                <PositionRightBottom />
              </PositionToggleButton>
            </ToolbarToggleButtonGroup>
          </Box>
        </SidebarGroup>
      </SidebarSection>
    </>
  );
}
