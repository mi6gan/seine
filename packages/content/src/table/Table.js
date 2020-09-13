// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import { useAutoCallback } from 'hooks.macro';

import { Item } from '../layout';

import TableCell from './TableCell';

import { useResizeTargetRef } from '@seine/styles';
import type { TableBody, TableFormat } from '@seine/core';

export type Props = TableBody & TableFormat;

const Container = styled(Item)``;

const StyledTable = styled.table`
  ${({
    scale,
    theme: {
      typography: { body1 },
    },
  }) => css`
    ${body1};
    width: 100%;
    transform-origin: left top;
    transform: scale(${scale});
    th,
    td {
      border-left: 1px solid #fff;
      border-right: 1px solid #fff;
      line-height: 1.5;
      padding: 1.25rem;
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

/**
 * @description Table block render component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default React.forwardRef(function Table(
  {
    title,
    header,
    rows,
    textAlignment,
    cellAs: Cell = TableCell,
    children = null,
    ...containerProps
  }: Props,
  ref
) {
  const containerRef = useResizeTargetRef();
  const tableRef = React.useRef<HTMLElement>(null);

  const { current: container } = containerRef;
  const { current: table } = tableRef;

  const scale =
    container && table ? container.offsetWidth / table.offsetWidth : 1;

  return (
    <Container
      {...containerProps}
      ref={useAutoCallback((container) => {
        containerRef.current = container;
        ref && ref(container);
      })}
    >
      <StyledTable ref={tableRef} scale={Math.min(1, scale)}>
        <thead>
          <tr>
            {header.map(({ text, ...cell }, index) => (
              <Cell
                as={'th'}
                key={index}
                meta={{ rowIndex: -1, columnIndex: index }}
                {...cell}
              >
                {text}
              </Cell>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((columns, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map(({ text, ...cell }, columnIndex) => (
                <Cell
                  key={columnIndex}
                  meta={{ rowIndex, columnIndex }}
                  {...cell}
                >
                  {text || ' '}
                </Cell>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
      {children}
    </Container>
  );
});
