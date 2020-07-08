// @flow
import * as React from 'react';
import { Box, IconButton } from '@material-ui/core';
import type { RichTextBody, RichTextFormat } from '@seine/core';
import { UPDATE_BLOCK_FORMAT } from '@seine/core';
import {
  FormatAlignLeft,
  FormatAlignRight,
  FormatAlignCenter,
  FormatAlignJustify,
} from '@material-ui/icons';
import { ActionButton } from '@seine/ui';

import SidebarHeading from '../ui/SidebarHeading';
import SidebarSection from '../ui/SidebarSection';

type Props = {
  body: RichTextBody,
  format: RichTextFormat,
};

/**
 * @description Rich text design panel.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function FlexDesign({ id, dispatch }: Props) {
  return (
    <>
      <SidebarHeading>Justify content</SidebarHeading>
      <SidebarSection>
        <Box display={'flex'}>
          <ActionButton
            as={IconButton}
            id={id}
            type={UPDATE_BLOCK_FORMAT}
            format={{ justify: 'flex-start' }}
            dispatch={dispatch}
            color={'inherit'}
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
          >
            <FormatAlignJustify />
          </ActionButton>
        </Box>
      </SidebarSection>
    </>
  );
}
