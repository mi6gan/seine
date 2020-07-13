// @flow
import * as React from 'react';
import { Box } from '@material-ui/core';
import { UPDATE_BLOCK_BODY } from '@seine/core';
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
import useSelectedBlock from '../context/useSelectedBlock';
import { useEditorDispatch } from '../context';

import { defaultTableEditor } from './constants';
import TableColumnPlusAfterIcon from './TableColumnPlusAfterIcon';
import TableColumnPlusBeforeIcon from './TableColumnPlusBeforeIcon';
import TableColumnRemoveIcon from './TableColumnRemoveIcon';
import TableRowPlusAfterIcon from './TableRowPlusAfterIcon';
import TableRowPlusBeforeIcon from './TableRowPlusBeforeIcon';
import TableRowRemoveIcon from './TableRowRemoveIcon';

const ButtonGroup = styled(Box).attrs({ mb: 1 })``;

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
    } = defaultTableBody,
  } = useSelectedBlock();
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
      <SidebarSection>
        <ButtonGroup>
          <ActionIconButton
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

          <ActionIconButton
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

          <ActionIconButton
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
        </ButtonGroup>
        <ButtonGroup>
          <ActionIconButton
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

          <ActionIconButton
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

          <ActionIconButton
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

        <ToolbarToggleButtonGroup value={cell} onChange={updateCurrentCell}>
          <ToolbarToggleButton selected={isBold} value={{ bold: !isBold }}>
            <FormatBold />
          </ToolbarToggleButton>

          <ToolbarToggleButton
            selected={isItalic}
            value={{ italic: !isItalic }}
          >
            <FormatItalic />
          </ToolbarToggleButton>
        </ToolbarToggleButtonGroup>

        <ToolbarToggleButtonGroup
          disabled={rowIndex > -1 && columnIndex > -1}
          value={cell}
          onChange={updateCurrentCell}
        >
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
    </>
  );
}
