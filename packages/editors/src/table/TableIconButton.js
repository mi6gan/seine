// @flow
import * as React from 'react';
import { blockTypes, CREATE_BLOCK, createBlock } from '@seine/core';
import { useAutoMemo } from 'hooks.macro';
import { TableChart as TableIcon } from '@material-ui/icons';
import { defaultTableCell } from '@seine/contents';

import ActionIconButton from '../ui/ActionIconButton';

// eslint-disable-next-line
export default function TableIconButton({
  type = null,
  block,
  parentId,
  dispatch,
}) {
  return (
    <ActionIconButton
      selected={
        type === CREATE_BLOCK && block && block.type === blockTypes.TABLE
      }
      type={CREATE_BLOCK}
      block={useAutoMemo(
        block === null &&
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
            null,
            parentId
          )
      )}
      Icon={TableIcon}
      dispatch={dispatch}
    />
  );
}
