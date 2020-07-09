// @flow
import * as React from 'react';
import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputLabel,
} from '@material-ui/core';
import type { RichTextBody, RichTextFormat } from '@seine/core';
import { defaultFlexFormat, UPDATE_BLOCK_FORMAT } from '@seine/core';
import {
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  VerticalAlignBottom,
  VerticalAlignCenter,
  VerticalAlignTop,
} from '@material-ui/icons';
import { ActionButton } from '@seine/ui';
import { useAutoCallback } from 'hooks.macro';

import SidebarSection from '../ui/SidebarSection';

type Props = {
  body: RichTextBody,
  format: RichTextFormat,
};

/**
 * @description Layout design.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function FlexDesign({ id, dispatch, format }: Props) {
  const { spacing = defaultFlexFormat.spacing } = format;
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
      </SidebarSection>
    </>
  );
}
