// @flow
import * as React from 'react';
import { ActionButton } from '@seine/ui';
import { blockTypes, CREATE_BLOCK } from '@seine/core';

import ToolbarButton from './ToolbarButton';

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
      <Icon
        fill={'currentColor'}
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
      />
    </ToolbarButton>
  );
}
