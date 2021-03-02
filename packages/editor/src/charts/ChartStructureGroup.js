// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { useAutoMemo } from 'hooks.macro';

import { SidebarGroup } from '../ui';
import { EditorActionButton, useBlocksDispatch } from '../blocks';
import { useSelectedLayoutItems } from '../layouts';

import { Button as MuiButton } from '@seine/styles/mui-core.macro';
import {
  Add,
  ControlPoint,
  DeleteOutlined,
  HighlightOff,
} from '@seine/styles/mui-icons.macro';
import { chartTypes, UPDATE_BLOCK_BODY } from '@seine/core';

const StyledButton = styled(MuiButton)`
  && {
    min-width: 0;
    padding: 0;
    color: ${({ theme, stroke = 'primary', light = false }) =>
      theme.palette[stroke][light ? 'light' : 'main']};
  }
`;

// eslint-disable-next-line
export default function ChartStructureGroup({ buttonAs: Button }) {
  const {
    item: {
      id,
      format: { kind },
      body: { header, rows, titles },
      editor: { columnIndex = null, rowIndex = null } = {},
    },
  } = useSelectedLayoutItems();
  const dispatch = useBlocksDispatch();
  const addGroupBody = useAutoMemo(() => {
    const group = {
      value: header.length,
      title: `Group ${header.length + 1}`,
    };
    return {
      header: [...header, group],
      rows: rows.map((row, index) => [
        ...row,
        {
          group: group.value,
          value: row[row.length - 1] ? row[row.length - 1].value : 0,
          text: titles[index],
        },
      ]),
    };
  });
  const removeRowBody = useAutoMemo({
    titles: [...titles.slice(0, rowIndex), ...titles.slice(rowIndex + 1)],
    rows: [...rows.slice(0, rowIndex), ...rows.slice(rowIndex + 1)],
  });
  const removeGroupBody = useAutoMemo({
    header: [...header.slice(0, columnIndex), ...header.slice(columnIndex + 1)],
    rows: rows.map((row) => [
      ...row.slice(0, columnIndex),
      ...row.slice(columnIndex + 1),
    ]),
  });
  return (
    <SidebarGroup alignItems={'flex-start'} my={0}>
      <EditorActionButton
        as={StyledButton}
        forwardedAs={Button}
        id={id}
        name={'add-item'}
        title={kind === chartTypes.LINE ? 'Add line' : 'add item'}
        variant={'text'}
        dispatch={dispatch}
        type={UPDATE_BLOCK_BODY}
        body={useAutoMemo(() => {
          const title = `Item ${titles.length + 1}`;
          const row = header.map(({ value: group }, index) => ({
            group,
            text: title,
            value:
              rows.reduce((s, row) => s + row[index].value, 0) / rows.length,
          }));
          return {
            titles: [...titles, title],
            rows: [...rows, row],
          };
        })}
      >
        <Add />
      </EditorActionButton>
      {(kind === chartTypes.LINE || kind === chartTypes.COLUMN) && (
        <>
          <EditorActionButton
            as={StyledButton}
            forwardedAs={Button}
            name={'add-group'}
            id={id}
            title={kind === chartTypes.LINE ? 'Add point' : 'Add group'}
            variant={'text'}
            dispatch={dispatch}
            type={UPDATE_BLOCK_BODY}
            body={addGroupBody}
          >
            <ControlPoint />
          </EditorActionButton>
          {columnIndex !== null &&
            rowIndex !== null &&
            (kind === chartTypes.COLUMN || kind === chartTypes.LINE) && (
              <EditorActionButton
                as={StyledButton}
                forwardedAs={Button}
                name={'remove-group'}
                id={id}
                stroke={'error'}
                variant={'text'}
                dispatch={dispatch}
                type={UPDATE_BLOCK_BODY}
                body={removeGroupBody}
              >
                <HighlightOff />
              </EditorActionButton>
            )}
        </>
      )}
      <EditorActionButton
        as={StyledButton}
        forwardedAs={Button}
        disabled={columnIndex === null || rowIndex === null}
        stroke={'error'}
        light
        name={'remove-item'}
        id={id}
        title={kind === chartTypes.LINE ? 'remove line' : 'remove selected'}
        variant={'text'}
        dispatch={dispatch}
        type={UPDATE_BLOCK_BODY}
        body={removeRowBody}
      >
        <DeleteOutlined />
      </EditorActionButton>
    </SidebarGroup>
  );
}
