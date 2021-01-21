// @flow
import * as React from 'react';

import { Frame } from '../ui';
import { useSelectedLayoutItems } from '../layouts';
import { useBlocksDispatch } from '../blocks';

import type { BlockEditor } from '@seine/core';
import type { TableProps } from '@seine/content';
import { Table } from '@seine/content';

type Props = TableProps & BlockEditor;

/**
 * @description Table block editor.
 * @param {Props} props
 * @returns {React.Node}
 */
const TableEditor = React.forwardRef(function TableEditor(
  { id, ...tableProps }: Props,
  ref
) {
  const { item } = useSelectedLayoutItems();
  return (
    <Frame
      {...tableProps}
      ref={ref}
      id={id}
      as={Table}
      onChange={useBlocksDispatch()}
      readOnly={!(item && item.id === id)}
    />
  );
});

export default TableEditor;
