// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { Box } from '@material-ui/core';
import { useAutoCallback } from 'hooks.macro';

import { useBlocksDispatch, useBlocksSelector } from '@seine/editor';
import type { BlockEditor } from '@seine/core';
import {
  blockTypes,
  SELECT_BLOCK,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_EDITOR,
} from '@seine/core';
import type { TableProps } from '@seine/content';
import { TableCell } from '@seine/content';
import { useResizeTargetRef } from '@seine/styles';

type Props = TableProps & BlockEditor;

const StyledTextarea = styled.textarea`
  && {
    text-align: ${({ align = 'left' }) => align};
    ${({ width }) => ({ width })};

    box-sizing: content-box;
    border: 1px ${({ borderStyle }) => borderStyle}
      ${({ theme }) => theme.palette.primary.light};
    &:hover {
      border-style: solid;
    }
    background: none;
    color: inherit;
    margin: -1px;
    padding: 0;
    font: inherit;
    height: ${({ value = '' }) =>
      [...value].reduce((found, char) => found + (char === '\n'), 1) * 1.5 +
      'em'};
    resize: none;
    overflow: hidden;
    letter-spacing: inherit;
    white-space: pre;
  }
`;

// eslint-disable-next-line
function Textarea({ value, placeholder, ...props }) {
  const boxRef = useResizeTargetRef();
  const { current: box } = boxRef;
  return (
    <>
      <StyledTextarea
        {...props}
        placeholder={placeholder}
        value={value}
        width={Math.max(20, box ? box.offsetWidth : 0)}
      />
      <Box visibility={'hidden'} position={'absolute'} ref={boxRef}>
        {value || placeholder}
      </Box>
    </>
  );
}

/**
 * @description Table block editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function TableCellEditor({
  meta: { rowIndex, columnIndex },
  children: text,
  ...cellProps
}: Props) {
  const selected = useBlocksSelector().find(
    (block) => block.type === blockTypes.TABLE
  );
  const header = selected && selected.body.header;
  const rows = selected && selected.body.rows;
  const row = rows && (rowIndex === -1 ? header : rows && rows[rowIndex]);
  const cell = row && row[columnIndex];
  const editor = selected && selected.editor;
  const dispatch = useBlocksDispatch();

  return (
    <TableCell {...cellProps}>
      <Textarea
        disabled={!selected}
        placeholder={'No text '}
        align={cell && cell.align}
        borderStyle={
          editor &&
          editor.rowIndex === rowIndex &&
          editor.columnIndex === columnIndex
            ? 'solid'
            : 'dashed'
        }
        onFocus={useAutoCallback(() => {
          dispatch({ type: SELECT_BLOCK, id: selected.id });
          dispatch({
            id: selected.id,
            type: UPDATE_BLOCK_EDITOR,
            editor: { columnIndex, rowIndex },
          });
        })}
        onChange={useAutoCallback(({ currentTarget }) => {
          dispatch({
            id: selected && selected.id,
            type: UPDATE_BLOCK_BODY,
            body:
              rowIndex === -1
                ? {
                    header: [
                      ...header.slice(0, columnIndex),
                      { ...cell, text: currentTarget.value },
                      ...header.slice(columnIndex + 1),
                    ],
                  }
                : {
                    rows: [
                      ...rows.slice(0, rowIndex),
                      [
                        ...row.slice(0, columnIndex),
                        { ...cell, text: currentTarget.value },
                        ...row.slice(columnIndex + 1),
                      ],
                      ...rows.slice(rowIndex + 1),
                    ],
                  },
          });
        })}
        value={text}
      />
    </TableCell>
  );
}
