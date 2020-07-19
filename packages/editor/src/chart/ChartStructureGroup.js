// @flow
import * as React from 'react';
import { ActionButton, CompositeActionButton } from '@seine/ui';
import {
  chartTypes,
  createTitleIdentityBlockElements,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_EDITOR,
} from '@seine/core';
import {
  DeleteOutlined,
  Add,
  ControlPoint,
  LinearScale,
} from '@material-ui/icons';
import { Button } from '@material-ui/core';
import styled from 'styled-components/macro';
import { useAutoMemo } from 'hooks.macro';
import { groupElements, titleIdentityElements } from '@seine/content';

import { useEditorDispatch } from '../store';
import SidebarGroup from '../ui/SidebarGroup';

import useChartBlock from './useChartBlock';

const StyledButton = styled(Button)`
  && {
    min-width: 0;
    color: ${({ theme, stroke = 'primary', light = false }) =>
      theme.palette[stroke][light ? 'light' : 'main']};
  }
`;

// eslint-disable-next-line
export default function ChartStructureGroup() {
  const {
    id,
    body: { elements },
    editor: { selection },
    format: { minValue, maxValue, kind },
  } = useChartBlock();
  const dispatch = useEditorDispatch();
  const values = useAutoMemo(elements.map(({ value }) => value));
  const min = useAutoMemo(minValue || Math.min(...values));
  const max = useAutoMemo(maxValue || Math.max(...values));
  const element =
    selection >= 0
      ? elements.find(({ id }, index) => index === selection)
      : null;
  return (
    <SidebarGroup alignItems={'flex-start'}>
      <ActionButton
        as={StyledButton}
        id={id}
        dispatch={dispatch}
        type={UPDATE_BLOCK_BODY}
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
        title={kind === chartTypes.LINE ? 'Add line' : 'add item'}
        variant={'text'}
      >
        {kind === chartTypes.LINE ? <Add /> : <LinearScale />}
      </ActionButton>
      {useAutoMemo(() => {
        if (kind === chartTypes.LINE) {
          const { length: groupsCount } = groupElements(elements);
          return (
            <ActionButton
              as={StyledButton}
              id={id}
              title={'Add point'}
              dispatch={dispatch}
              type={UPDATE_BLOCK_BODY}
              body={{
                elements: [
                  ...elements,
                  ...titleIdentityElements(elements).map((element) => ({
                    ...element,
                    group: `Group #${groupsCount + 1}`,
                    value:
                      minValue ||
                      elements
                        .filter(({ id }) => id === element.id)
                        .reverse()[0].value,
                  })),
                ],
              }}
              variant={'text'}
            >
              <ControlPoint />
            </ActionButton>
          );
        }
      })}
      <CompositeActionButton
        as={StyledButton}
        disabled={elements.length <= 2}
        dispatch={dispatch}
        stroke={'error'}
        light
        actions={useAutoMemo([
          {
            editor: { selection: -1 },
            id: id,
            type: UPDATE_BLOCK_EDITOR,
          },
          {
            body: {
              elements:
                kind === chartTypes.LINE
                  ? elements.filter(({ id }) => id !== element.id)
                  : [
                      ...elements.slice(0, selection),
                      ...elements.slice(selection + 1),
                    ],
            },
            id: id,
            type: UPDATE_BLOCK_BODY,
          },
        ])}
        variant={'text'}
      >
        <DeleteOutlined />
      </CompositeActionButton>
    </SidebarGroup>
  );
}
