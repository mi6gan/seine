// @flow
import * as React from 'react';
import { ActionButton, CompositeActionButton } from '@seine/ui';
import {
  createTitleIdentityBlockElements,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_EDITOR,
} from '@seine/core';
import { DeleteOutlined, Add } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import styled from 'styled-components/macro';
import { useAutoMemo } from 'hooks.macro';
import { groupElements } from '@seine/content';

import { useEditorDispatch } from '../store';
import SidebarGroup from '../ui/SidebarGroup';

import useChartBlock from './useChartBlock';

const StyledButton = styled(Button)`
  && {
    min-width: 0;
    color: ${({ theme, stroke, light = false }) =>
      theme.palette[stroke][light ? 'light' : 'main']};
  }
`;

// eslint-disable-next-line
export default function ChartStructureGroup() {
  const {
    id,
    body: { elements },
    editor: { selection },
    format: { minValue, maxValue },
  } = useChartBlock();
  const dispatch = useEditorDispatch();
  const values = useAutoMemo(elements.map(({ value }) => value));
  const min = useAutoMemo(minValue || Math.min(...values));
  const max = useAutoMemo(maxValue || Math.max(...values));
  return (
    <SidebarGroup alignItems={'flex-start'}>
      <ActionButton
        as={StyledButton}
        id={id}
        dispatch={dispatch}
        type={UPDATE_BLOCK_BODY}
        stroke={'primary'}
        body={useAutoMemo({
          elements: [
            ...elements,
            ...createTitleIdentityBlockElements(
              groupElements(elements).map(([group, { length }]) => ({
                ...(group ? { group } : {}),
                title: `Item #${length}`,
                value: min + Math.floor((max - min) / 2),
              }))
            ),
          ],
        })}
        variant={'text'}
      >
        <Add />
      </ActionButton>
      <CompositeActionButton
        as={StyledButton}
        disabled={elements.length <= 2}
        dispatch={dispatch}
        stroke={'error'}
        light
        actions={React.useMemo(
          () => [
            {
              editor: { selection: -1 },
              id: id,
              type: UPDATE_BLOCK_EDITOR,
            },
            {
              body: {
                elements: [
                  ...elements.slice(0, selection),
                  ...elements.slice(selection + 1),
                ],
              },
              id: id,
              type: UPDATE_BLOCK_BODY,
            },
          ],
          [elements, selection, id]
        )}
        variant={'text'}
      >
        <DeleteOutlined />
      </CompositeActionButton>
    </SidebarGroup>
  );
}
