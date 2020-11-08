// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';
import { RichUtils } from 'draft-js';

import {
  SidebarButtonGroup,
  SidebarGroup,
  SidebarHeading,
  SidebarInput,
  SidebarLabel,
  SidebarSection,
  ToolbarToggleButton,
  ToolbarToggleButtonGroup,
} from '../ui';
import { EditorActionIconButton, useBlocksDispatch } from '../blocks';
import { useSelectedLayoutItems } from '../layouts';

import { defaultTableEditor } from './constants';
import TableColumnPlusAfterIcon from './TableColumnPlusAfterIcon';
import TableColumnPlusBeforeIcon from './TableColumnPlusBeforeIcon';
import TableColumnRemoveIcon from './TableColumnRemoveIcon';
import TableRowPlusAfterIcon from './TableRowPlusAfterIcon';
import TableRowPlusBeforeIcon from './TableRowPlusBeforeIcon';
import TableRowRemoveIcon from './TableRowRemoveIcon';

import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatUnderlined,
} from '@seine/styles/mui-icons.macro';
import { defaultTableBody, defaultTableCell } from '@seine/content';
import { UPDATE_BLOCK_BODY, UPDATE_BLOCK_EDITOR } from '@seine/core';
import { SvgIcon } from '@seine/styles/mui-core.macro';

const StructureActionButton = styled(EditorActionIconButton).attrs({
  borderColor: 'transparent',
  variant: 'outlined',
  size: 'small',
})`
  && {
    padding: 7px;
  }
`;

const SvgText = styled.text.attrs({
  textAnchor: 'middle',
  dominantBaseline: 'middle',
  fontSize: '1rem',
  fontWeight: 600,
  x: '50%',
  y: '50%',
})``;

/**
 * @description Table design panel.
 * @returns {React.Node}
 */
export default function TableDesign() {
  const dispatch = useBlocksDispatch();
  const { item } = useSelectedLayoutItems();
  const {
    id,
    editor: {
      rowIndex = defaultTableEditor.rowIndex,
      columnIndex = defaultTableEditor.columnIndex,
      [`${rowIndex}:${columnIndex}`]: editorState,
    } = defaultTableEditor,
    body: {
      header = defaultTableBody.header,
      rows = defaultTableBody.rows,
    } = defaultTableBody,
  } = item || {};
  const cellId = `${rowIndex}:${columnIndex}`;
  const row = rowIndex === -1 ? header : rows && rows[rowIndex];
  const cell = row && row[columnIndex];

  const blockType = useAutoMemo(
    editorState &&
      editorState
        .getCurrentContent()
        .getBlockForKey(editorState.getSelection().getStartKey())
        .getType()
  );
  const toggleBlockType = useAutoCallback((event, blockType) => {
    dispatch({
      id,
      type: UPDATE_BLOCK_EDITOR,
      editor: {
        [cellId]: RichUtils.toggleBlockType(editorState, blockType),
      },
    });
  });
  const isLeft = cell && cell.align === 'left';
  const isCenter = cell && cell.align === 'center';
  const isRight = cell && cell.align === 'right';

  return (
    <>
      <SidebarSection {...(columnIndex === -1 && { display: 'none' })}>
        <SidebarHeading>Table</SidebarHeading>
        <SidebarGroup>
          <SidebarLabel>structure</SidebarLabel>
          <SidebarButtonGroup>
            <StructureActionButton
              color={'success.light'}
              Icon={TableColumnPlusBeforeIcon}
              body={useAutoMemo(
                columnIndex > -1
                  ? {
                      header: [
                        ...header.slice(0, columnIndex),
                        defaultTableCell,
                        ...header.slice(columnIndex),
                      ],
                      rows: rows.map((row) => [
                        ...row.slice(0, columnIndex),
                        defaultTableCell,
                        ...row.slice(columnIndex),
                      ]),
                    }
                  : {
                      header: [defaultTableCell, ...header],
                      rows: rows.map((row) => [defaultTableCell, ...row]),
                    }
              )}
              id={id}
              type={UPDATE_BLOCK_BODY}
              dispatch={dispatch}
              title={'Add column before'}
            />

            <StructureActionButton
              color={'success.light'}
              Icon={TableColumnPlusAfterIcon}
              body={useAutoMemo(
                columnIndex > -1
                  ? {
                      header: [
                        ...header.slice(0, columnIndex + 1),
                        defaultTableCell,
                        ...header.slice(columnIndex + 1),
                      ],
                      rows: rows.map((row) => [
                        ...row.slice(0, columnIndex + 1),
                        defaultTableCell,
                        ...row.slice(columnIndex + 1),
                      ]),
                    }
                  : {
                      header: [...header, defaultTableCell],
                      rows: rows.map((row) => [...row, defaultTableCell]),
                    }
              )}
              id={id}
              type={UPDATE_BLOCK_BODY}
              dispatch={dispatch}
              title={'Add column after'}
            />

            <StructureActionButton
              color={'error.light'}
              Icon={TableColumnRemoveIcon}
              disabled={!(rows.length && rows[0].length > 1)}
              body={useAutoMemo({
                header: [
                  ...header.slice(0, columnIndex),
                  ...header.slice(columnIndex + 1),
                ],
                rows: rows.map((row) => [
                  ...row.slice(0, columnIndex),
                  ...row.slice(columnIndex + 1),
                ]),
              })}
              id={id}
              type={UPDATE_BLOCK_BODY}
              dispatch={dispatch}
              title={'Remove column'}
            />

            <StructureActionButton
              color={'success.light'}
              Icon={TableRowPlusBeforeIcon}
              body={useAutoMemo({
                rows:
                  columnIndex > -1
                    ? [
                        ...rows.slice(0, rowIndex),
                        rows[0].map(() => defaultTableCell),
                        ...rows.slice(rowIndex),
                      ]
                    : [rows[0].map(() => defaultTableCell), ...rows],
              })}
              id={id}
              type={UPDATE_BLOCK_BODY}
              dispatch={dispatch}
              title={'Add row before'}
            />

            <StructureActionButton
              color={'success.light'}
              Icon={TableRowPlusAfterIcon}
              body={useAutoMemo({
                rows:
                  columnIndex > -1
                    ? [
                        ...rows.slice(0, rowIndex + 1),
                        rows[0].map(() => defaultTableCell),
                        ...rows.slice(rowIndex + 1),
                      ]
                    : [...rows, rows.map(() => defaultTableCell)],
              })}
              id={id}
              type={UPDATE_BLOCK_BODY}
              dispatch={dispatch}
              title={'Add row after'}
            />

            <StructureActionButton
              color={'error.light'}
              Icon={TableRowRemoveIcon}
              body={useAutoMemo({
                rows: [...rows.slice(0, rowIndex), ...rows.slice(rowIndex + 1)],
              })}
              disabled={!(rows.length > 1)}
              id={id}
              type={UPDATE_BLOCK_BODY}
              dispatch={dispatch}
              title={'Remove row'}
            />
          </SidebarButtonGroup>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarLabel>column %</SidebarLabel>
          <SidebarInput
            type={'number'}
            inputProps={{ min: 0, max: 100 }}
            value={header[columnIndex] ? header[columnIndex].width : ''}
            onChange={useAutoCallback((event) =>
              dispatch({
                type: UPDATE_BLOCK_BODY,
                body: {
                  header: [
                    ...header.slice(0, columnIndex),
                    {
                      ...header[columnIndex],
                      width: +event.currentTarget.value,
                    },
                    ...header.slice(columnIndex + 1),
                  ],
                },
              })
            )}
          />
        </SidebarGroup>
      </SidebarSection>
      <SidebarSection>
        <SidebarHeading>Rich text</SidebarHeading>
        <SidebarGroup>
          <SidebarLabel>heading</SidebarLabel>
          <ToolbarToggleButtonGroup
            value={blockType}
            onChange={toggleBlockType}
          >
            <ToolbarToggleButton value={'header-one'}>
              <SvgIcon>
                <SvgText>H1</SvgText>
              </SvgIcon>
            </ToolbarToggleButton>

            <ToolbarToggleButton value={'header-two'}>
              <SvgIcon>
                <SvgText>H2</SvgText>
              </SvgIcon>
            </ToolbarToggleButton>

            <ToolbarToggleButton value={'header-three'}>
              <SvgIcon>
                <SvgText>H3</SvgText>
              </SvgIcon>
            </ToolbarToggleButton>
          </ToolbarToggleButtonGroup>
        </SidebarGroup>
        <SidebarGroup alignItems={'center'}>
          <SidebarLabel>&nbsp;</SidebarLabel>
          <ToolbarToggleButtonGroup
            value={blockType}
            onChange={toggleBlockType}
          >
            <ToolbarToggleButton value={'header-four'}>
              <SvgIcon>
                <SvgText>H4</SvgText>
              </SvgIcon>
            </ToolbarToggleButton>

            <ToolbarToggleButton value={'header-five'}>
              <SvgIcon>
                <SvgText>H5</SvgText>
              </SvgIcon>
            </ToolbarToggleButton>
          </ToolbarToggleButtonGroup>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarLabel>list</SidebarLabel>
          <ToolbarToggleButtonGroup
            value={blockType}
            onChange={toggleBlockType}
          >
            <ToolbarToggleButton value={'ordered-list-item'}>
              <FormatListNumbered />
            </ToolbarToggleButton>

            <ToolbarToggleButton value={'unordered-list-item'}>
              <FormatListBulleted />
            </ToolbarToggleButton>
          </ToolbarToggleButtonGroup>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarLabel>style</SidebarLabel>
          <ToolbarToggleButtonGroup
            value={useAutoMemo(
              editorState ? [...editorState.getCurrentInlineStyle()] : []
            )}
            onChange={useAutoCallback((event, style) => {
              dispatch({
                id,
                type: UPDATE_BLOCK_EDITOR,
                editor: {
                  [cellId]: RichUtils.toggleInlineStyle(editorState, style),
                },
              });
            })}
          >
            <ToolbarToggleButton value={'BOLD'}>
              <FormatBold />
            </ToolbarToggleButton>

            <ToolbarToggleButton value={'ITALIC'}>
              <FormatItalic />
            </ToolbarToggleButton>

            <ToolbarToggleButton value={'UNDERLINE'}>
              <FormatUnderlined />
            </ToolbarToggleButton>
          </ToolbarToggleButtonGroup>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarLabel>alignment</SidebarLabel>

          <ToolbarToggleButtonGroup
            value={cell && cell.align}
            onChange={useAutoCallback((event, align) => {
              const { align: lastAlign, ...value } = cell;
              dispatch({
                id,
                type: UPDATE_BLOCK_BODY,
                body:
                  rowIndex === -1
                    ? {
                        header: [
                          ...header.slice(0, columnIndex),
                          align ? { ...value, align } : value,
                          ...header.slice(columnIndex + 1),
                        ],
                      }
                    : {
                        rows: [
                          ...rows.slice(0, rowIndex),
                          [
                            ...row.slice(0, columnIndex),
                            align ? { ...value, align } : value,
                            ...row.slice(columnIndex + 1),
                          ],
                          ...rows.slice(rowIndex + 1),
                        ],
                      },
              });
            })}
            exclusive
          >
            <ToolbarToggleButton value={'left'} selected={isLeft}>
              <FormatAlignLeft />
            </ToolbarToggleButton>

            <ToolbarToggleButton value={'center'} selected={isCenter}>
              <FormatAlignCenter />
            </ToolbarToggleButton>

            <ToolbarToggleButton value={'right'} selected={isRight}>
              <FormatAlignRight />
            </ToolbarToggleButton>
          </ToolbarToggleButtonGroup>
        </SidebarGroup>
      </SidebarSection>
    </>
  );
}
