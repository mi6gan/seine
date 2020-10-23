// @flow
import * as React from 'react';

import { Frame } from '../ui';

import type { BlockEditor } from '@seine/core';
import type { TableProps } from '@seine/content';
import { Table } from '@seine/content';
import { useBlocksDispatch } from '@seine/editor';

type Props = TableProps & BlockEditor;

/**
 * @description Table block editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function TableEditor(props: Props) {
  return (
    <Frame
      {...props}
      as={Table}
      onChange={useBlocksDispatch()}
      readOnly={false}
    />
  );
}
