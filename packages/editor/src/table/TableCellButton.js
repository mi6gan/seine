// @flow
import * as React from 'react';
import { ActionButton } from '@seine/ui';
import type { ActionButtonProps } from '@seine/ui';
import { UPDATE_BLOCK_BODY } from '@seine/core';
import type { TableBody, TableCell } from '@seine/core';

type Props = {
  children: any,
  columnIndex: number,
  rowIndex: number,
  cell: TableCell,
} & $Rest<ActionButtonProps, {| type: string |}> &
  TableBody;

/**
 * @description Table cell format button
 * @param {Props} props
 * @returns {React.Node}
 */
export default function TableCellButton({
  cell,
  children = null,
  rows,
  rowIndex,
  columnIndex,
  header,
  ...buttonProps
}: Props) {
  return (
    <ActionButton
      type={UPDATE_BLOCK_BODY}
      {...buttonProps}
      body={
        rowIndex === 0
          ? {
              header: [
                ...header.slice(0, columnIndex),
                { ...header.slice(columnIndex + 1), ...cell },
                ...header.slice(columnIndex + 1),
              ],
            }
          : {
              rows: [
                ...rows.slice(0, rowIndex - 1),
                [
                  ...rows[rowIndex - 1].slice(0, columnIndex),
                  {
                    ...rows[rowIndex - 1][columnIndex],
                    ...cell,
                  },
                  ...rows[rowIndex - 1].slice(columnIndex + 1),
                ],
                ...rows.slice(rowIndex),
              ],
            }
      }
    >
      {children}
    </ActionButton>
  );
}
