// @flow
import * as React from 'react';
import { Box, Input, InputLabel } from '@material-ui/core';
import { blockTypes, defaultItemFormat, UPDATE_BLOCK_BODY } from '@seine/core';
import { defaultTableBody, defaultTableCell } from '@seine/content';
import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
} from '@material-ui/icons';
import styled from 'styled-components/macro';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';

import SidebarHeading from '../ui/SidebarHeading';
import SidebarSection from '../ui/SidebarSection';
import ActionIconButton from '../ui/ActionIconButton';
import ToolbarToggleButtonGroup from '../ui/ToolbarToggleButtonGroup';
import ToolbarToggleButton from '../ui/ToolbarToggleButton';
import { useEditorDispatch, useSelectedBlocks } from '../store';

import { defaultTableEditor } from './constants';
import TableColumnPlusAfterIcon from './TableColumnPlusAfterIcon';
import TableColumnPlusBeforeIcon from './TableColumnPlusBeforeIcon';
import TableColumnRemoveIcon from './TableColumnRemoveIcon';
import TableRowPlusAfterIcon from './TableRowPlusAfterIcon';
import TableRowPlusBeforeIcon from './TableRowPlusBeforeIcon';
import TableRowRemoveIcon from './TableRowRemoveIcon';

const ButtonGroup = styled(Box)`
  ${({ theme }) => ({ margin: theme.spacing(0, 1, 1, 0) })};
`;

const StructureActionButton = styled(ActionIconButton).attrs({
  borderColor: 'transparent',
  variant: 'outlined',
  size: 'small',
})`
  && {
    padding: 7px;
  }
`;

/**
 * @description Table design panel.
 * @returns {React.Node}
 */
export default function TableDesign() {
  const dispatch = useEditorDispatch();
  const {
    id,
    editor: {
      rowIndex = defaultTableEditor.rowIndex,
      columnIndex = defaultTableEditor.columnIndex,
    } = defaultTableEditor,
    body: {
      header = defaultTableBody.header,
      rows = defaultTableBody.rows,
      textAlignment = defaultTableBody.textAlignment,
    } = defaultTableBody,
    format: { layout = defaultItemFormat.layout },
  } = useSelectedBlocks().find(({ type }) => type === blockTypes.TABLE) || {};
  const row = rowIndex === -1 ? header : rows && rows[rowIndex];
  const cell = row && row[columnIndex];
  const isBold = cell && cell.bold;
  const isItalic = cell && cell.italic;
  const isLeft = cell && cell.align === 'left';
  const isCenter = cell && cell.align === 'center';
  const isRight = cell && cell.align === 'right';

  const updateCurrentCell = useAutoCallback((event, updates) =>
    dispatch({
      id,
      type: UPDATE_BLOCK_BODY,
      body:
        rowIndex === -1
          ? {
              header: [
                ...header.slice(0, columnIndex),
                { ...cell, ...updates },
                ...header.slice(columnIndex + 1),
              ],
            }
          : {
              rows: [
                ...rows.slice(0, rowIndex),
                [
                  ...row.slice(0, columnIndex),
                  { ...cell, ...updates },
                  ...row.slice(columnIndex + 1),
                ],
                ...rows.slice(rowIndex + 1),
              ],
            },
    })
  );

  return (
    <>
      <SidebarHeading>Table</SidebarHeading>
      <SidebarSection {...(columnIndex === -1 && { display: 'none' })}>
        <InputLabel shrink>Structure</InputLabel>
        <ButtonGroup>
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
        </ButtonGroup>
      </SidebarSection>

      <SidebarSection {...(columnIndex > -1 && { display: 'none' })}>
        <InputLabel shrink>Alignment</InputLabel>
        <ToolbarToggleButtonGroup
          value={textAlignment}
          onChange={useAutoCallback((event, textAlignment) =>
            dispatch({
              type: UPDATE_BLOCK_BODY,
              body: { textAlignment },
            })
          )}
        >
          <ToolbarToggleButton value={'left'}>
            <FormatAlignLeft />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'center'}>
            <FormatAlignCenter />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={'right'}>
            <FormatAlignRight />
          </ToolbarToggleButton>
        </ToolbarToggleButtonGroup>
      </SidebarSection>

      <SidebarSection {...(columnIndex === -1 && { display: 'none' })}>
        <InputLabel shrink>Style</InputLabel>
        <ToolbarToggleButtonGroup value={cell} onChange={updateCurrentCell}>
          {rowIndex > -1 && (
            <ToolbarToggleButton selected={isBold} value={{ bold: !isBold }}>
              <FormatBold />
            </ToolbarToggleButton>
          )}

          <ToolbarToggleButton
            selected={isItalic}
            value={{ italic: !isItalic }}
          >
            <FormatItalic />
          </ToolbarToggleButton>
        </ToolbarToggleButtonGroup>

        <ToolbarToggleButtonGroup value={cell} onChange={updateCurrentCell}>
          <ToolbarToggleButton value={{ align: 'left' }} selected={isLeft}>
            <FormatAlignLeft />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={{ align: 'center' }} selected={isCenter}>
            <FormatAlignCenter />
          </ToolbarToggleButton>

          <ToolbarToggleButton value={{ align: 'right' }} selected={isRight}>
            <FormatAlignRight />
          </ToolbarToggleButton>
        </ToolbarToggleButtonGroup>
      </SidebarSection>
      <SidebarSection {...(columnIndex === -1 && { display: 'none' })}>
        <InputLabel shrink>Width (%)</InputLabel>
        <Box width={'3em'}>
          <Input
            disabled={layout === blockTypes.FLEX}
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
        </Box>
      </SidebarSection>
    </>
  );
}