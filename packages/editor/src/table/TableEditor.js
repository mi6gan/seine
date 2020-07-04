// @flow
import * as React from 'react';
import type { BlockEditor } from '@seine/core';
import {
  SELECT_BLOCK,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_EDITOR,
} from '@seine/core';
import styled from 'styled-components/macro';
import { InlineInput } from '@seine/ui';
import { useAutoCallback } from 'hooks.macro';
import type { TableProps } from '@seine/content';
import { Table } from '@seine/content';
import { Box } from '@material-ui/core';

import Frame from '../ui/Frame';

import { defaultTableEditor } from './constants';

type Props = TableProps & BlockEditor;

const StyledTextarea = styled.textarea`
  && {
    ${({ width }) => ({ width })};
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

// eslint-disable-next-line
function Textarea({ value, ...props }) {
  const [box, setBox] = React.useState(null);
  return (
    <>
      <Box visibility={'hidden'} ref={setBox} position={'absolute'}>
        {value}
      </Box>
      <StyledTextarea {...props} value={value} width={box && box.offsetWidth} />
    </>
  );
}

/**
 * @description Table block editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function TableEditor({
  id,
  dispatch,
  header,
  rows,
  title,
  selection,
  textAlignment,
}: Props) {
  const editTitle = useAutoCallback(({ currentTarget: { value } }) =>
    dispatch({ type: UPDATE_BLOCK_BODY, body: { title: value } })
  );
  return selection.length === 1 && selection[0] === id ? (
    <Frame
      selected
      as={Table}
      id={id}
      dispatch={dispatch}
      textAlignment={textAlignment}
      title={
        <InlineInput
          forwardedAs={'input'}
          onChange={editTitle}
          onFocus={() => {
            dispatch({ id, type: SELECT_BLOCK });
            dispatch({
              id,
              type: UPDATE_BLOCK_EDITOR,
              editor: defaultTableEditor,
            });
          }}
          value={title}
        />
      }
      header={header.map(({ text, ...column }, index) => ({
        ...column,
        text: (
          <div>
            <Textarea
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
            <div>
              <Textarea
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
            </div>
          ),
        }))
      )}
    />
  ) : (
    <Frame
      id={id}
      dispatch={dispatch}
      as={Table}
      header={header}
      rows={rows}
      title={title}
    />
  );
}
