// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';
import { RichUtils } from 'draft-js';

import {
  SidebarButtonGroup,
  SidebarGroup,
  SidebarHeading,
  SidebarLabel,
  SidebarSection,
  ToolbarToggleButton,
  ToolbarToggleButtonGroup,
} from '../ui';
import { EditorActionIconButton, useBlocksDispatch } from '../blocks';
import { useSelectedLayoutItems } from '../layouts';
import ConstraintInput from '../ui/ConstraintInput';

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
import {
  defaultTableBody,
  defaultTableCell,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_EDITOR,
} from '@seine/core';
import { SvgIcon } from '@seine/styles/mui-core.macro';
import { Box } from '@seine/styles';

const SvgText = styled.text.attrs({
  textAnchor: 'middle',
  dominantBaseline: 'middle',
  fontSize: '1rem',
  fontWeight: 600,
  x: '50%',
  y: '50%',
})``;

type Props = {
  inputAs?: React.ComponentType,
  toggleAs?: React.ComponentType,
  sectionAs?: React.ComponentType,
  actionIconButtonAs?: React.ComponentType,
};

/**
 * @description Table design panel.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function TableDesign({
  toggleAs: ToggleButtonGroup = ToolbarToggleButtonGroup,
  actionIconButtonAs: ActionButton = EditorActionIconButton,
  sectionAs: Section = SidebarSection,
}: Props) {
  const dispatch = useBlocksDispatch();
  const {
    item: {
      id,
      editor: {
        rowIndex = -1,
        columnIndex = -1,
        [`${rowIndex}:${columnIndex}`]: editorState,
      } = {},
      body: { header = defaultTableBody.header, rows = defaultTableBody.rows },
    },
  } = useSelectedLayoutItems();
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
      <Section
        {...(columnIndex === -1 && { display: 'none' })}
        id={'table-design-section-table'}
      >
        <SidebarHeading>Table</SidebarHeading>
        <SidebarGroup>
          <SidebarLabel>structure</SidebarLabel>
          <Box>
            <SidebarButtonGroup>
              <ActionButton
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
                value={'add-column-before'}
              />

              <ActionButton
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
                value={'add-column-after'}
              />

              <ActionButton
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
                value={'remove-column'}
              />
            </SidebarButtonGroup>

            <SidebarButtonGroup>
              <ActionButton
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
                value={'add-row-before'}
              />

              <ActionButton
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
                value={'add-row-after'}
              />

              <ActionButton
                color={'error.light'}
                Icon={TableRowRemoveIcon}
                body={useAutoMemo({
                  rows: [
                    ...rows.slice(0, rowIndex),
                    ...rows.slice(rowIndex + 1),
                  ],
                })}
                disabled={!(rows.length > 1)}
                id={id}
                type={UPDATE_BLOCK_BODY}
                dispatch={dispatch}
                title={'Remove row'}
                value={'remove-row'}
              />
            </SidebarButtonGroup>
          </Box>
        </SidebarGroup>

        <SidebarGroup {...(!cell && { display: 'none' })}>
          <SidebarLabel>cell size</SidebarLabel>
          <Box display={'flex'} mr={1} as={'form'}>
            <ConstraintInput
              id={id}
              key={columnIndex}
              inputProps={{ placeholder: 'min', min: 0 }}
              units={['%', 'px', 'rem']}
              value={header[columnIndex] && header[columnIndex].width}
              onSubmit={useAutoCallback((value) => {
                const { width: __, ...cell } = header[columnIndex];
                dispatch({
                  type: UPDATE_BLOCK_BODY,
                  body: {
                    header: [
                      ...header.slice(0, columnIndex),
                      {
                        ...cell,
                        ...(value !== null && { width: value }),
                      },
                      ...header.slice(columnIndex + 1),
                    ],
                  },
                });
              })}
            />
          </Box>
        </SidebarGroup>
      </Section>
      <Section id={'table-design-section-text'}>
        <SidebarHeading>Rich text</SidebarHeading>
        <SidebarGroup>
          <SidebarLabel>heading</SidebarLabel>
          <ToggleButtonGroup value={blockType} onChange={toggleBlockType}>
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
          </ToggleButtonGroup>
        </SidebarGroup>
        <SidebarGroup alignItems={'center'}>
          <SidebarLabel>&nbsp;</SidebarLabel>
          <ToggleButtonGroup value={blockType} onChange={toggleBlockType}>
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
          </ToggleButtonGroup>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarLabel>list</SidebarLabel>
          <ToggleButtonGroup value={blockType} onChange={toggleBlockType}>
            <ToolbarToggleButton value={'ordered-list-item'}>
              <FormatListNumbered />
            </ToolbarToggleButton>

            <ToolbarToggleButton value={'unordered-list-item'}>
              <FormatListBulleted />
            </ToolbarToggleButton>
          </ToggleButtonGroup>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarLabel>style</SidebarLabel>
          <ToggleButtonGroup
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
          </ToggleButtonGroup>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarLabel>alignment</SidebarLabel>

          <ToggleButtonGroup
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
          </ToggleButtonGroup>
        </SidebarGroup>
      </Section>
    </>
  );
}
