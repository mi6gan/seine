// @flow
import * as React from 'react';
import { Checkbox, IconButton } from '@material-ui/core';
import type { RichTextBody, RichTextFormat } from '@seine/core';
import { UPDATE_BLOCK_BODY } from '@seine/core';
import { defaultTableBody, defaultTableCell } from '@seine/content';
import { useAutoCallback } from 'hooks.macro';
import { ActionButton, Input } from '@seine/ui';
import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
} from '@material-ui/icons';

import SidebarHeading from '../ui/SidebarHeading';
import SidebarSection from '../ui/SidebarSection';

import TableCellButton from './TableCellButton';
import { defaultTableEditor } from './constants';

type Props = {
  body: RichTextBody,
  format: RichTextFormat,
};

/**
 * @description Rich text design panel.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function TableDesign({ body, dispatch, id, editor }: Props) {
  const { header, rows, textAlignment } = body || defaultTableBody;
  const { rowIndex, columnIndex } = editor || defaultTableEditor;
  const cell =
    (rowIndex === 0 && header[columnIndex]) ||
    (rowIndex > 0 && rows[rowIndex - 1][columnIndex]);
  const isBold = cell && cell.bold;
  const isItalic = cell && cell.italic;
  const isLeft = cell && cell.align === 'left';
  const isCenter = cell && cell.align === 'center';
  const isRight = cell && cell.align === 'right';
  return (
    <>
      <SidebarHeading>Table</SidebarHeading>
      <SidebarSection>
        <ActionButton
          fullWidth
          body={
            columnIndex > -1
              ? {
                  header: [
                    ...header.slice(0, columnIndex + 1),
                    defaultTableCell,
                    ...header.slice(columnIndex + 1),
                  ],
                  rows: rows.map((row) => [
                    ...row.slice(0, columnIndex + 1),
                    defaultTableCell,
                    ...row.slice(columnIndex + 1),
                  ]),
                }
              : {
                  header: [...header, defaultTableCell],
                  rows: rows.map((row) => [...row, defaultTableCell]),
                }
          }
          id={id}
          type={UPDATE_BLOCK_BODY}
          dispatch={dispatch}
        >
          Add column
        </ActionButton>

        <ActionButton
          fullWidth
          disabled={!(rows.length && rows[0].length > 1)}
          body={{
            header: [
              ...header.slice(0, columnIndex),
              ...header.slice(columnIndex + 1),
            ],
            rows: rows.map((row) => [
              ...row.slice(0, columnIndex),
              ...row.slice(columnIndex + 1),
            ]),
          }}
          id={id}
          type={UPDATE_BLOCK_BODY}
          dispatch={dispatch}
        >
          Remove column
        </ActionButton>
        <ActionButton
          fullWidth
          body={{
            rows:
              columnIndex > -1
                ? [
                    ...rows.slice(0, rowIndex + 1),
                    rows[0].map(() => defaultTableCell),
                    ...rows.slice(rowIndex + 1),
                  ]
                : [...rows, rows.map(() => defaultTableCell)],
          }}
          id={id}
          type={UPDATE_BLOCK_BODY}
          dispatch={dispatch}
        >
          Add row
        </ActionButton>
        <ActionButton
          fullWidth
          body={{
            rows: [...rows.slice(0, rowIndex), ...rows.slice(rowIndex + 1)],
          }}
          disabled={!(rows.length > 1)}
          id={id}
          type={UPDATE_BLOCK_BODY}
          dispatch={dispatch}
        >
          Remove row
        </ActionButton>
        <Checkbox
          disabled={columnIndex < 0}
          onChange={useAutoCallback(() => {
            const { width = null, ...headerCell } = header[columnIndex];
            dispatch({
              type: UPDATE_BLOCK_BODY,
              body: {
                header: [
                  ...header.slice(0, columnIndex),
                  width === null
                    ? { ...headerCell, width: parseInt(100 / header.length) }
                    : headerCell,
                  ...header.slice(columnIndex + 1),
                ],
              },
            });
          })}
          checked={columnIndex > -1 && 'width' in header[columnIndex]}
        />
        <Input
          disabled={columnIndex < 0 || !('width' in header[columnIndex])}
          placeholder={'width (%)'}
          type={'number'}
          min={0}
          max={100}
          width={'100%'}
          onChange={useAutoCallback((event) =>
            dispatch({
              type: UPDATE_BLOCK_BODY,
              body: {
                header: [
                  ...header.slice(0, columnIndex),
                  { ...header[columnIndex], width: +event.currentTarget.value },
                  ...header.slice(columnIndex + 1),
                ],
              },
            })
          )}
          value={columnIndex < 0 ? '' : header[columnIndex].width}
        />
        {rowIndex > -1 && columnIndex > -1 ? (
          <>
            <TableCellButton
              {...body}
              as={IconButton}
              dispatch={dispatch}
              id={id}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              cell={{ bold: !isBold }}
            >
              <FormatBold {...(!isBold && { color: 'disabled' })} />
            </TableCellButton>

            <TableCellButton
              {...body}
              as={IconButton}
              dispatch={dispatch}
              id={id}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              cell={{ italic: !isItalic }}
            >
              <FormatItalic {...(!isItalic && { color: 'disabled' })} />
            </TableCellButton>

            <TableCellButton
              {...body}
              as={IconButton}
              dispatch={dispatch}
              id={id}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              cell={{ align: 'left' }}
            >
              <FormatAlignLeft {...(!isLeft && { color: 'disabled' })} />
            </TableCellButton>

            <TableCellButton
              {...body}
              as={IconButton}
              dispatch={dispatch}
              id={id}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              cell={{ align: 'center' }}
            >
              <FormatAlignCenter {...(!isCenter && { color: 'disabled' })} />
            </TableCellButton>

            <TableCellButton
              {...body}
              as={IconButton}
              dispatch={dispatch}
              id={id}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              cell={{ align: 'right' }}
            >
              <FormatAlignRight {...(!isRight && { color: 'disabled' })} />
            </TableCellButton>
          </>
        ) : (
          <>
            <ActionButton
              type={UPDATE_BLOCK_BODY}
              as={IconButton}
              dispatch={dispatch}
              body={{ textAlignment: 'left' }}
            >
              <FormatAlignLeft
                {...(textAlignment !== 'left' && { color: 'disabled' })}
              />
            </ActionButton>
            <ActionButton
              type={UPDATE_BLOCK_BODY}
              as={IconButton}
              dispatch={dispatch}
              body={{ textAlignment: 'center' }}
            >
              <FormatAlignCenter
                {...(textAlignment !== 'center' && { color: 'disabled' })}
              />
            </ActionButton>

            <ActionButton
              type={UPDATE_BLOCK_BODY}
              as={IconButton}
              dispatch={dispatch}
              body={{ textAlignment: 'right' }}
            >
              <FormatAlignRight
                {...(textAlignment !== 'right' && { color: 'disabled' })}
              />
            </ActionButton>
          </>
        )}
      </SidebarSection>
    </>
  );
}
