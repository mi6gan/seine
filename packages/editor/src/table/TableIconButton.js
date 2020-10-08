// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import { BlocksContext, useBlocksBuffer } from '../context';
import ToolbarButton from '../ui/ToolbarButton';

import { BlockTypeIcon } from '@seine/editor';
import { defaultTableCell } from '@seine/content';
import { blockTypes, createBlock } from '@seine/core';

// eslint-disable-next-line
export default function TableIconButton() {
  const { setBuffer } = React.useContext(BlocksContext);
  const buffer = useBlocksBuffer();
  const selected = buffer && buffer.type === blockTypes.TABLE;

  return (
    <ToolbarButton
      onMouseDown={useAutoCallback(() =>
        setBuffer(
          selected
            ? null
            : createBlock(
                blockTypes.TABLE,
                {
                  header: [
                    { ...defaultTableCell, text: 'Column 1' },
                    { ...defaultTableCell, text: 'Column 2' },
                  ],
                  rows: [
                    [defaultTableCell, defaultTableCell],
                    [defaultTableCell, defaultTableCell],
                  ],
                },
                null
              )
        )
      )}
      bgcolor={selected ? 'grey.800' : 'inherit'}
    >
      <BlockTypeIcon type={blockTypes.TABLE} />
    </ToolbarButton>
  );
}
