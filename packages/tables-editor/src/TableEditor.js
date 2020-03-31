// @flow
import * as React from 'react';
import type { BlockEditor } from '@seine/core';
import {
  SELECT_BLOCK,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_EDITOR,
} from '@seine/core';
import type { TableProps } from '@seine/tables';
import { Table } from '@seine/tables';
import styled from 'styled-components/macro';
import { BlockActions } from '@seine/ui';

type Props = TableProps & BlockEditor;

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const StyledTextarea = styled.textarea`
  && {
    width: 100%;
    background: none;
    border: 0;
    color: inherit;
    margin: 0;
    padding: 0;
    font: inherit;
    text-align: inherit;
    height: ${({ value = '' }) =>
      [...value].reduce((found, char) => found + (char === '\n'), 1) * 1.5 +
      'em'};
    resize: none;
  }
`;

/**
 * @description Table block editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function TableEditor({
  addButtonRenderMap,
  id,
  dispatch,
  header,
  rows,
  selection,
}: Props) {
  return (
    <Container>
      {selection.length === 1 && selection[0] === id ? (
        <Table
          header={header.map(({ text, ...column }, index) => ({
            ...column,
            text: (
              <div>
                <StyledTextarea
                  onFocus={() => {
                    dispatch({ id, type: SELECT_BLOCK });
                    dispatch({
                      id,
                      type: UPDATE_BLOCK_EDITOR,
                      editor: {
                        columnIndex: index,
                        rowIndex: 0,
                      },
                    });
                  }}
                  onChange={({ currentTarget }) =>
                    dispatch({
                      id,
                      type: UPDATE_BLOCK_BODY,
                      body: {
                        header: [
                          ...header.slice(0, index),
                          { ...column, text: currentTarget.value },
                          ...header.slice(index + 1),
                        ],
                      },
                    })
                  }
                  value={text}
                />
              </div>
            ),
          }))}
          rows={rows.map((row, rowIndex) =>
            row.map(({ text, ...column }, columnIndex) => ({
              ...column,
              text: (
                <StyledTextarea
                  onFocus={() => {
                    dispatch({ id, type: SELECT_BLOCK });
                    dispatch({
                      id,
                      type: UPDATE_BLOCK_EDITOR,
                      editor: {
                        columnIndex,
                        rowIndex: rowIndex + 1,
                      },
                    });
                  }}
                  onChange={({ currentTarget }) =>
                    dispatch({
                      id,
                      type: UPDATE_BLOCK_BODY,
                      body: {
                        rows: [
                          ...rows.slice(0, rowIndex),
                          [
                            ...row.slice(0, columnIndex),
                            { ...column, text: currentTarget.value },
                            ...row.slice(columnIndex + 1),
                          ],
                          ...rows.slice(rowIndex + 1),
                        ],
                      },
                    })
                  }
                  value={text}
                />
              ),
            }))
          )}
        />
      ) : (
        <Table header={header} rows={rows} />
      )}
      <BlockActions
        addButtonRenderMap={addButtonRenderMap}
        dispatch={dispatch}
        id={id}
        selection={selection}
      />
    </Container>
  );
}
