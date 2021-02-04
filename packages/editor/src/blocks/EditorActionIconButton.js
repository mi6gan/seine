// @flow
import * as React from 'react';

import ToolbarButton from '../ui/ToolbarButton';

import EditorActionButton from './EditorActionButton';

import { blockTypes, CREATE_BLOCK } from '@seine/core';

// eslint-disable-next-line
const EditorActionIconButton = React.forwardRef(function EditorActionIconButton(
  { Icon, ...action },
  ref
) {
  return (
    <ToolbarButton
      as={EditorActionButton}
      ref={ref}
      title={
        action.type === CREATE_BLOCK
          ? `Add ${
              action.block.type === blockTypes.CHART
                ? `${action.block.format.kind} chart`
                : action.block.type === blockTypes.RICH_TEXT
                ? 'rich text'
                : action.block.type
            }`
          : action.type
      }
      {...action}
    >
      <Icon />
    </ToolbarButton>
  );
});

export default EditorActionIconButton;
