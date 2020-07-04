// @flow
import * as React from 'react';
import { ActionButton } from '@seine/ui';
import { UPDATE_BLOCK_FORMAT } from '@seine/core';
import type { UpdateBlockFormatAction } from '@seine/core';
import {
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
} from '@material-ui/icons';
import { defaultChartTextAlignment } from '@seine/content';

type Props = {
  current?: boolean,
  children?: React.Node,
  dispatch: (UpdateBlockFormatAction) => any,
  value: 'left' | 'center' | 'right',
  textAlignmentIcons?: {
    ['left' | 'center' | 'right']: React.ComponentType<any>,
  },
};

const defaultTextAlignmentIcons = {
  left: FormatAlignLeft,
  center: FormatAlignCenter,
  right: FormatAlignRight,
};

/**
 * @description Button that sets charts title text alignment.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartTextAlignmentButton({
  value = defaultChartTextAlignment,
  textAlignmentIcons: { [value]: Icon } = defaultTextAlignmentIcons,
  current = false,
  children = <Icon />,
  size = 'small',
  ...buttonProps
}: Props) {
  return (
    <ActionButton
      {...buttonProps}
      format={{ textAlignment: value }}
      size={size}
      type={UPDATE_BLOCK_FORMAT}
      value={value}
    >
      {children}
    </ActionButton>
  );
}
