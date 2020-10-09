// @flow
import * as React from 'react';

import ToolbarButton from './ToolbarButton';
import ActionButton from './ActionButton';

import { blockTypes, CREATE_BLOCK } from '@seine/core';

// eslint-disable-next-line
export default function ActionIconButton({ Icon, ...action }) {
  return (
    <ToolbarButton
      as={ActionButton}
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
}
