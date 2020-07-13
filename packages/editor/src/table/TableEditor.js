// @flow
import * as React from 'react';
import type { BlockEditor } from '@seine/core';
import {
  SELECT_BLOCK,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_EDITOR,
} from '@seine/core';
import { InlineInput } from '@seine/ui';
import { useAutoCallback } from 'hooks.macro';
import type { TableProps } from '@seine/content';
import { Table } from '@seine/content';

import Frame from '../ui/Frame';
import { useEditorDispatch, useEditorSelector } from '../context';

import { defaultTableEditor } from './constants';
import TableCellEditor from './TableCellEditor';

type Props = TableProps & BlockEditor;

/**
 * @description Table block editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function TableEditor({ id, title, ...tableProps }: Props) {
  const dispatch = useEditorDispatch();
  const editTitle = useAutoCallback(({ currentTarget: { value } }) =>
    dispatch({ type: UPDATE_BLOCK_BODY, body: { title: value } })
  );
  const selected = useEditorSelector(({ selection }) => selection.includes(id));
  return (
    <Frame
      {...tableProps}
      selected={selected}
      as={Table}
      id={id}
      title={title}
      {...(selected && {
        cellAs: TableCellEditor,
        title: (
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
        ),
      })}
    />
  );
}
