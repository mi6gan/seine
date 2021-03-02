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
            rows:
              columnIndex > -1
                ? [
                    ...rows.slice(0, rowIndex + 1),
                    row,
                    ...rows.slice(rowIndex + 1),
                  ]
                : [...rows, row],
          };
        })}
      >
        <Add />
      </EditorActionButton>
      {(kind === chartTypes.LINE || kind === chartTypes.COLUMN) && (
        <>
          <StyledButton
            name={'add-group'}
            as={Button}
            id={id}
            title={kind === chartTypes.LINE ? 'Add point' : 'Add group'}
            variant={'text'}
          >
            <ControlPoint />
          </StyledButton>
          {columnIndex !== null &&
            rowIndex !== null &&
            (kind === chartTypes.COLUMN || kind === chartTypes.LINE) && (
              <StyledButton
                name={'remove-group'}
                as={Button}
                id={id}
                stroke={'error'}
                variant={'text'}
              >
                <HighlightOff />
              </StyledButton>
            )}
        </>
      )}
      <StyledButton
        as={Button}
        disabled={columnIndex === null || rowIndex === null}
        stroke={'error'}
        light
        name={'remove-item'}
        title={kind === chartTypes.LINE ? 'remove line' : 'remove selected'}
        variant={'text'}
      >
        <DeleteOutlined />
      </StyledButton>
    </SidebarGroup>
  );
}
