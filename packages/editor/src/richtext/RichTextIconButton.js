// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';
import { Title as RichTextIcon } from '@material-ui/icons';

import { EditorContext, useBlocksBuffer } from '../context';
import ToolbarButton from '../ui/ToolbarButton';

import { toRawContent } from '@seine/content';
import { blockTypes, createBlock } from '@seine/core';

// eslint-disable-next-line
export default function RichTextIconButton() {
  const { setBuffer } = React.useContext(EditorContext);
  const buffer = useBlocksBuffer();
  const selected = buffer && buffer.type === blockTypes.RICH_TEXT;

  return (
    <ToolbarButton
      onMouseDown={useAutoCallback(() =>
        setBuffer(
          selected
            ? null
            : createBlock(blockTypes.RICH_TEXT, toRawContent('Rich text'), {
                verticalAlignment: 'center',
              })
        )
      )}
      bgcolor={selected ? 'grey.800' : 'inherit'}
    >
      <RichTextIcon />
    </ToolbarButton>
  );
}
