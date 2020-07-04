// @flow
import * as React from 'react';
import { blockTypes, CREATE_BLOCK, createBlock } from '@seine/core';
import { toRawContent } from '@seine/content';
import { useAutoMemo } from 'hooks.macro';
import { Title as RichTextIcon } from '@material-ui/icons';

import ActionIconButton from '../ui/ActionIconButton';

// eslint-disable-next-line
export default function RichTextIconButton({
  type = null,
  block = null,
  parentId,
  dispatch,
}) {
  return (
    <ActionIconButton
      selected={
        type === CREATE_BLOCK && block && block.type === blockTypes.RICH_TEXT
      }
      type={CREATE_BLOCK}
      block={useAutoMemo(
        block === null &&
          createBlock(
            blockTypes.RICH_TEXT,
            toRawContent('Rich text'),
            {
              verticalAlignment: 'center',
            },
            parentId
          )
      )}
      Icon={RichTextIcon}
      dispatch={dispatch}
    />
  );
}
