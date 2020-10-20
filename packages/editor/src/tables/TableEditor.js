// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import { Frame } from '../ui';
import { useBlocksDispatch } from '../blocks';
import { useSelectedLayoutItems } from '../layouts';

import type { BlockEditor } from '@seine/core';
import { UPDATE_BLOCK_BODY } from '@seine/core';
import type { TableProps } from '@seine/content';
import { Table } from '@seine/content';

type Props = TableProps & BlockEditor;

/**
 * @description Table block editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function TableEditor({
  id,
  title,
  header,
  rows,
  ...tableProps
}: Props) {
  const dispatch = useBlocksDispatch();
  const { item } = useSelectedLayoutItems();
  const selected = !!(item && item.id === id);

  return (
    <Frame
      {...tableProps}
      header={header}
      rows={rows}
      id={id}
      as={Table}
      readOnly={false}
      onChange={useAutoCallback(({ rowIndex, columnIndex, state }) => {
        const row = rows && (rowIndex === -1 ? header : rows && rows[rowIndex]);
        const cell = row && row[columnIndex];
        dispatch({
          id: selected && selected.id,
          type: UPDATE_BLOCK_BODY,
          body:
            rowIndex === -1
              ? {
                  header: [
                    ...header.slice(0, columnIndex),
                    { ...cell, text: state },
                    ...header.slice(columnIndex + 1),
                  ],
                }
              : {
                  rows: [
                    ...rows.slice(0, rowIndex),
                    [
                      ...row.slice(0, columnIndex),
                      { ...cell, text: state },
                      ...row.slice(columnIndex + 1),
                    ],
                    ...rows.slice(rowIndex + 1),
                  ],
                },
        });
      })}
    />
  );
}
