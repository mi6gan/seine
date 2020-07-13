// @flow
import * as React from 'react';
import { blockTypes, createBlock } from '@seine/core';
import { useAutoCallback } from 'hooks.macro';
import { TableChart as TableIcon } from '@material-ui/icons';
import { defaultTableCell } from '@seine/content';

import { EditorContext } from '../store';
import useEditorBuffer from '../store/useEditorBuffer';
import ToolbarButton from '../ui/ToolbarButton';

// eslint-disable-next-line
export default function TableIconButton() {
  const { setBuffer } = React.useContext(EditorContext);
  const buffer = useEditorBuffer();
  const selected = buffer && buffer.type === blockTypes.TABLE;

  return (
    <ToolbarButton
      onMouseDown={useAutoCallback(() =>
        setBuffer(
          createBlock(
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
      <TableIcon />
    </ToolbarButton>
  );
}
