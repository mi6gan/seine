// @flow
import * as React from 'react';
import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputLabel,
} from '@material-ui/core';
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
  WrapText,
} from '@material-ui/icons';
import { ActionButton } from '@seine/ui';
import { useAutoCallback } from 'hooks.macro';

import SidebarSection from '../ui/SidebarSection';
import { useEditorDispatch, useSelectedBlocks } from '../store';
import ToolbarToggleButton from '../ui/ToolbarToggleButton';

/**
 * @description Layout design.
 * @returns {React.Node}
 */
export default function FlexDesign() {
  const layoutBlock = useSelectedBlocks().find(
    ({ type }) => type === blockTypes.FLEX
  );
  const dispatch = useEditorDispatch();
  const id = layoutBlock && layoutBlock.id;
  const {
    spacing = defaultFlexFormat.spacing,
    wrap = defaultFlexFormat.wrap,
  } = layoutBlock ? layoutBlock.format || defaultFlexFormat : defaultFlexFormat;
  return (
    <>
      <SidebarSection>
        <FormControl fullWidth>
          <InputLabel>Spacing</InputLabel>
          <Input
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
        </FormControl>
      </SidebarSection>

      <SidebarSection>
        <InputLabel shrink>Alignment</InputLabel>
        <Box display={'flex'}>
          <ActionButton
            as={IconButton}
            id={id}
            type={UPDATE_BLOCK_FORMAT}
            format={{ justify: 'flex-start' }}
            dispatch={dispatch}
            color={'inherit'}
            title={'Start'}
          >
            <FormatAlignLeft />
          </ActionButton>

          <ActionButton
            as={IconButton}
            id={id}
            type={UPDATE_BLOCK_FORMAT}
            format={{ justify: 'center' }}
            dispatch={dispatch}
            color={'inherit'}
            title={'Center'}
          >
            <FormatAlignCenter />
          </ActionButton>

          <ActionButton
            as={IconButton}
            id={id}
            type={UPDATE_BLOCK_FORMAT}
            format={{ justify: 'flex-end' }}
            dispatch={dispatch}
            color={'inherit'}
            title={'End'}
          >
            <FormatAlignRight />
          </ActionButton>

          <ActionButton
            as={IconButton}
            id={id}
            type={UPDATE_BLOCK_FORMAT}
            format={{ justify: 'space-between' }}
            dispatch={dispatch}
            color={'inherit'}
            title={'Space between'}
          >
            <FormatAlignJustify />
          </ActionButton>
        </Box>
        <Box display={'flex'}>
          <ActionButton
            as={IconButton}
            id={id}
            type={UPDATE_BLOCK_FORMAT}
            format={{ alignItems: 'flex-start' }}
            dispatch={dispatch}
            color={'inherit'}
            title={'Start'}
          >
            <VerticalAlignTop />
          </ActionButton>

          <ActionButton
            as={IconButton}
            id={id}
            type={UPDATE_BLOCK_FORMAT}
            format={{ alignItems: 'center' }}
            dispatch={dispatch}
            color={'inherit'}
            title={'Center'}
          >
            <VerticalAlignCenter />
          </ActionButton>

          <ActionButton
            as={IconButton}
            id={id}
            type={UPDATE_BLOCK_FORMAT}
            format={{ alignItems: 'flex-end' }}
            dispatch={dispatch}
            color={'inherit'}
            title={'End'}
          >
            <VerticalAlignBottom />
          </ActionButton>
        </Box>
        <SidebarSection>
          <InputLabel shrink>Wrap</InputLabel>
          <ToolbarToggleButton
            selected={wrap === 'wrap'}
            onClick={useAutoCallback(() =>
              dispatch({
                type: UPDATE_BLOCK_FORMAT,
                format: { wrap: wrap === 'wrap' ? 'nowrap' : 'wrap' },
              })
            )}
            value={'left'}
          >
            <WrapText />
          </ToolbarToggleButton>
        </SidebarSection>
      </SidebarSection>
    </>
  );
}
