// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import { useAutoCallback, useAutoEffect, useAutoMemo } from 'hooks.macro';

import { Item } from '../layouts';
import useBlock from '../useBlock';
import { RichText, toDraftEditor, toRawContent } from '../richtexts';

import { defaultTableBody } from './constants';

import type { TableBody, TableFormat } from '@seine/core';
import { UPDATE_BLOCK_BODY, UPDATE_BLOCK_EDITOR } from '@seine/core';

export type Props = TableBody &
  TableFormat & {
    onChange: ?(SyntheticInputEvent) => any,
  };

const Container = styled(Item)`
  overflow: auto;
`;

const StyledTable = styled.table`
  ${({
    theme: {
      typography: { body1 },
    },
  }) => css`
    ${body1};
    width: 100%;

    th,
    td {
      border-left: 1px solid #fff;
      border-right: 1px solid #fff;
      line-height: 1.5;
      padding: 0.5rem 1.25rem;
      white-space: pre-wrap;
      ${({ readOnly }) => !readOnly && { cursor: 'text' }};
    }

    & > thead {
      background-color: #ebebeb;
      & > tr > th {
        font-weight: 600;
      }
    }

    & > tbody {
      & > tr:nth-child(2n + 1) {
        background-color: #fdfdfd;
        border: none;
      }
      & > tr:nth-child(2n) {
        background-color: #f7f7f7;
        border: none;
      }
    }
  `}
`;

// eslint-disable-next-line
function TableCellText({
  id,
  children,
  rowIndex,
  columnIndex,
  onChange: dispatch,
  ...props
}) {
  const block = useBlock(id);
  const { rows, header } = (block && block.body) || defaultTableBody;
  const row = rows && (rowIndex === -1 ? header : rows && rows[rowIndex]);
  const cell = row && row[columnIndex];
  const cellId = `${rowIndex}:${columnIndex}`;
  const editorState = useAutoMemo(
    (block && block.editor && block.editor[cellId]) || toDraftEditor(children)
  );
  const editorRef = React.useRef(null);
  const selected = !!(
    block &&
    block.editor &&
    block.editor.rowIndex === rowIndex &&
    block.editor.columnIndex === columnIndex
  );
  useAutoEffect(() => {
    const { current } = editorRef;
    if (
      editorState &&
      selected &&
      current &&
      !(
        document.activeElement &&
        document.activeElement instanceof HTMLInputElement
      )
    ) {
      current.focus();
    }
  });

  React.useEffect(() => {
    if (!selected && dispatch) {
      const text = toRawContent(editorState);
      dispatch({
        id,
        type: UPDATE_BLOCK_BODY,
        body:
          rowIndex === -1
            ? {
                header: [
                  ...header.slice(0, columnIndex),
                  { ...cell, text },
                  ...header.slice(columnIndex + 1),
                ],
              }
            : {
                rows: [
                  ...rows.slice(0, rowIndex),
                  [
                    ...row.slice(0, columnIndex),
                    { ...cell, text },
                    ...row.slice(columnIndex + 1),
                  ],
                  ...rows.slice(rowIndex + 1),
                ],
              },
      });
    }
    // eslint-disable-next-line
  }, [selected]);

  return (
    <RichText
      {...props}
      ref={editorRef}
      textAlignment={cell && cell.align}
      editorState={editorState}
      onChange={useAutoCallback((state) => {
        dispatch({
          id,
          type: UPDATE_BLOCK_EDITOR,
          editor: { [cellId]: state },
        });
      })}
      onFocus={useAutoCallback(() => {
        dispatch({
          id,
          type: UPDATE_BLOCK_EDITOR,
          editor: { rowIndex, columnIndex },
        });
      })}
    />
  );
}

/**
 * @description Table block render component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Table({
  id,
  title,
  header,
  rows,
  textAlignment,
  onChange,
  readOnly = true,
  ...containerProps
}: Props) {
  return (
    <Container {...containerProps} id={id}>
      <StyledTable>
        <thead>
          <tr>
            {header.map(({ text }, index) => (
              <th key={index}>
                <TableCellText
                  id={id}
                  rowIndex={-1}
                  columnIndex={index}
                  onChange={onChange}
                  readOnly={readOnly}
                >
                  {typeof text === 'string' ? `<b>${text}</b>` : text}
                </TableCellText>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((columns, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map(({ text }, columnIndex) => (
                <td key={columnIndex}>
                  <TableCellText
                    id={id}
                    rowIndex={rowIndex}
                    columnIndex={columnIndex}
                    onChange={onChange}
                    readOnly={readOnly}
                  >
                    {text}
                  </TableCellText>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  );
}
