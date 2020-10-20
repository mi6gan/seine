// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import { useAutoCallback } from 'hooks.macro';

import { Item } from '../layouts';

import type { TableBody, TableFormat } from '@seine/core';
import { RichText, toDraftEditor, toRawContent } from '@seine/content';

export type Props = TableBody &
  TableFormat & {
    onChange: ?(SyntheticInputEvent) => any,
  };

const Container = styled(Item)``;

const StyledTable = styled.table`
  ${({
    theme: {
      typography: { body1 },
    },
  }) => css`
    ${body1};
    width: 100%;

    th,
    td {
      border-left: 1px solid #fff;
      border-right: 1px solid #fff;
      line-height: 1.5;
      padding: 0.5rem 1.25rem;
      white-space: pre-wrap;
    }

    & > thead {
      background-color: #ebebeb;
      & > tr > th {
        font-weight: 600;
      }
    }

    & > tbody {
      & > tr:nth-child(2n + 1) {
        background-color: #fdfdfd;
        border: none;
      }
      & > tr:nth-child(2n) {
        background-color: #f7f7f7;
        border: none;
      }
    }
  `}
`;

// eslint-disable-next-line
function TableCellText({
  children,
  onChange,
  rowIndex,
  columnIndex,
  ...props
}) {
  const [editorState, setEditorState] = React.useState(() =>
    toDraftEditor(children)
  );

  return (
    <RichText
      {...props}
      editorState={editorState}
      onChange={setEditorState}
      onBlur={useAutoCallback(() => {
        if (onChange) {
          onChange({
            rowIndex,
            columnIndex,
            state: toRawContent(editorState.getCurrentContent()),
          });
        }
      })}
    />
  );
}

/**
 * @description Table block render component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Table({
  title,
  header,
  rows,
  textAlignment,
  onChange,
  readOnly = true,
  ...containerProps
}: Props) {
  return (
    <Container {...containerProps}>
      <StyledTable>
        <thead>
          <tr>
            {header.map(({ text }, index) => (
              <th key={index}>
                <TableCellText
                  rowIndex={-1}
                  columnIndex={index}
                  onChange={onChange}
                  readOnly={readOnly}
                >
                  {`<b>${text}</b>`}
                </TableCellText>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((columns, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map(({ text }, columnIndex) => (
                <td key={columnIndex}>
                  <TableCellText
                    rowIndex={rowIndex}
                    columnIndex={columnIndex}
                    onChange={onChange}
                    readOnly={readOnly}
                  >
                    {text}
                  </TableCellText>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  );
}
