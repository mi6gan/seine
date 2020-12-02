// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { useAutoMemo } from 'hooks.macro';

import {
  EditorActionButton,
  EditorCompositeActionButton,
  useBlocksDispatch,
} from '../blocks';
import { SidebarGroup } from '../ui';
import { useSelectedLayoutItems } from '../layouts';

import useElementSelector from './useElementSelector';

import { Button } from '@seine/styles/mui-core.macro';
import {
  Add,
  ControlPoint,
  DeleteOutlined,
  HighlightOff,
} from '@seine/styles/mui-icons.macro';
import { groupElements } from '@seine/content';
import {
  chartTypes,
  createBlockElement,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_EDITOR,
} from '@seine/core';

const StyledButton = styled(Button)`
  && {
    min-width: 0;
    padding: 0;
    color: ${({ theme, stroke = 'primary', light = false }) =>
      theme.palette[stroke][light ? 'light' : 'main']};
  }
`;

// eslint-disable-next-line
export default function ChartStructureGroup() {
  const {
    item: {
      id,
      body: { elements },
      format: { minValue, maxValue, kind },
    },
  } = useSelectedLayoutItems();
  const dispatch = useBlocksDispatch();
  const values = useAutoMemo(elements.map(({ value }) => value));
  const min = useAutoMemo(minValue || Math.min(...values));
  const max = useAutoMemo(maxValue || Math.max(...values));
  const { selection, element } = useElementSelector();
  const groups = groupElements(elements);
  const [[, { length: count }]] = groups;
  return (
    <SidebarGroup alignItems={'flex-start'} my={0}>
      <EditorActionButton
        as={StyledButton}
        id={id}
        dispatch={dispatch}
        type={UPDATE_BLOCK_BODY}
        body={useAutoMemo(
          kind === chartTypes.PIE
            ? {
                elements: [
                  ...elements,
                  createBlockElement({
                    title: `Item ${elements.length + 1}`,
                    value: Math.floor(min + (max - min) / 2),
                  }),
                ],
              }
            : {
                elements: groups.reduce(
                  (acc, [group, groupElements]) => [
                    ...acc,
                    ...groupElements.map(({ index }) => elements[index]),
                    createBlockElement({
                      group,
                      title: `Item ${groupElements.length + 1}`,
                      value: Math.floor(min + (max - min) / 2),
                    }),
                  ],
                  []
                ),
              }
        )}
        title={kind === chartTypes.LINE ? 'Add line' : 'add item'}
        variant={'text'}
      >
        <Add />
      </EditorActionButton>
      {useAutoMemo(() => {
        if (kind === chartTypes.LINE || kind === chartTypes.COLUMN) {
          let groupNumber = 0;
          while (true) {
            const group = `Group #${groupNumber}`;
            if (!groups.some(([otherGroup]) => otherGroup === group)) {
              break;
            }
            groupNumber += 1;
          }

          return (
            <>
              <EditorActionButton
                as={StyledButton}
                id={id}
                title={kind === chartTypes.LINE ? 'Add point' : 'Add group'}
                dispatch={dispatch}
                type={UPDATE_BLOCK_BODY}
                body={{
                  elements: [
                    ...elements,
                    ...groups[0][1].map(({ index }) =>
                      createBlockElement({
                        ...elements[index],
                        group: `Group #${groupNumber}`,
                      })
                    ),
                  ],
                }}
                variant={'text'}
              >
                <ControlPoint />
              </EditorActionButton>
              {element && kind === chartTypes.COLUMN && (
                <EditorActionButton
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
                </EditorActionButton>
              )}
            </>
          );
        }
        return null;
      })}
      <EditorCompositeActionButton
        as={StyledButton}
        disabled={selection === -1 || count <= 1}
        dispatch={dispatch}
        stroke={'error'}
        light
        title={kind === chartTypes.LINE ? 'remove line' : 'remove selected'}
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
                  : kind === chartTypes.COLUMN
                  ? element
                    ? elements.filter(({ title }) => title !== element.title)
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
      </EditorCompositeActionButton>
    </SidebarGroup>
  );
}
