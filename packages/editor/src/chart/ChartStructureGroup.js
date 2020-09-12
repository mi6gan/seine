// @flow
import * as React from 'react';
import {
  chartTypes,
  createBlockElement,
  createTitleIdentityBlockElements,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_EDITOR,
} from '@seine/core';
import {
  Add,
  ControlPoint,
  DeleteOutlined,
  HighlightOff,
} from '@material-ui/icons';
import { Button } from '@material-ui/core';
import styled from 'styled-components/macro';
import { useAutoMemo } from 'hooks.macro';
import { groupElements, titleIdentityElements } from '@seine/content';

import { useBlocksDispatch } from '../context';
import SidebarGroup from '../ui/SidebarGroup';
import ActionButton from '../ui/ActionButton';
import CompositeActionButton from '../ui/CompositeActionButton';

import useChartBlock from './useChartBlock';
import useElementSelector from './useElementSelector';

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
    format: { minValue, maxValue, kind },
  } = useChartBlock();
  const dispatch = useBlocksDispatch();
  const values = useAutoMemo(elements.map(({ value }) => value));
  const min = useAutoMemo(minValue || Math.min(...values));
  const max = useAutoMemo(maxValue || Math.max(...values));
  const { selection, element } = useElementSelector();
  const [[, { length: count }]] = groupElements(elements);
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
            ...(kind === chartTypes.PIE
              ? [
                  createBlockElement({
                    title: `Item #${elements.length + 1}`,
                    value: Math.floor(min + (max - min) / 2),
                  }),
                ]
              : createTitleIdentityBlockElements(
                  groupElements(elements).map(([group, { length }]) => ({
                    ...(group ? { group } : {}),
                    title: `Item #${length}`,
                    value: Math.floor(min + (max - min) / 2),
                  }))
                )),
          ],
        })}
        title={kind === chartTypes.LINE ? 'Add line' : 'add item'}
        variant={'text'}
      >
        <Add />
      </ActionButton>
      {useAutoMemo(() => {
        if (kind === chartTypes.LINE || kind === chartTypes.COLUMN) {
          const { length: groupsCount } = groupElements(elements);
          return (
            <>
              <ActionButton
                as={StyledButton}
                id={id}
                title={kind === chartTypes.LINE ? 'Add point' : 'Add group'}
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
                        (element &&
                          elements
                            .filter(({ id }) => id === element.id)
                            .reverse()[0].value),
                    })),
                  ],
                }}
                variant={'text'}
              >
                <ControlPoint />
              </ActionButton>
              {element && kind === chartTypes.COLUMN && (
                <ActionButton
                  as={StyledButton}
                  id={id}
                  title={'Remove group'}
                  dispatch={dispatch}
                  type={UPDATE_BLOCK_BODY}
                  stroke={'error'}
                  body={{
                    elements: elements.filter(
                      ({ group }) => group !== element.group
                    ),
                  }}
                  variant={'text'}
                >
                  <HighlightOff />
                </ActionButton>
              )}
            </>
          );
        }
        return null;
      })}
      <CompositeActionButton
        as={StyledButton}
        disabled={selection === -1 || count <= 1}
        dispatch={dispatch}
        stroke={'error'}
        light
        title={kind === chartTypes.LINE ? 'remove line' : 'remove item'}
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
                  ? element
                    ? elements.filter(({ id }) => id !== element.id)
                    : []
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
