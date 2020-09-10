// @flow
import * as React from 'react';
import type { BlockEditor } from '@seine/core';
import { UPDATE_BLOCK_BODY, UPDATE_BLOCK_EDITOR } from '@seine/core';
import { useAutoCallback } from 'hooks.macro';
import type { TableProps } from '@seine/content';
import { Table } from '@seine/content';

import Frame from '../ui/Frame';
import { useBlocksDispatch } from '../context';
import useSelectedLayoutItems from '../layout/useSelectedLayoutItems';
import InlineInput from '../ui/InlineInput';

import { defaultTableEditor } from './constants';
import TableCellEditor from './TableCellEditor';

type Props = TableProps & BlockEditor;

/**
 * @description Table block editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function TableEditor({ id, title, ...tableProps }: Props) {
  const dispatch = useBlocksDispatch();
  const editTitle = useAutoCallback(({ currentTarget: { value } }) =>
    dispatch({ type: UPDATE_BLOCK_BODY, body: { title: value } })
  );
  const { item } = useSelectedLayoutItems();
  const selected = !!(item && item.id === id);

  return (
    <Frame
      {...tableProps}
      id={id}
      as={Table}
      title={
        selected ? (
          <InlineInput
            forwardedAs={'input'}
            onChange={editTitle}
            onFocus={() => {
              dispatch({
                id,
                type: UPDATE_BLOCK_EDITOR,
                editor: defaultTableEditor,
              });
            }}
            value={title}
          />
        ) : (
          title
        )
      }
      {...(!!selected && { cellAs: TableCellEditor })}
    />
  );
}
