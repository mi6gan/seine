// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import { useAutoEffect, useAutoCallback } from 'hooks.macro';

import { Typography } from '@seine/styles';

const TableTitle = styled(Typography).attrs(() => ({
  variant: 'h3',
  as: 'h3',
}))`
  margin-bottom: 0.5em;
  ${({ textAlignment }) => textAlignment && { textAlign: textAlignment }}
`;

const Container = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
`;

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

const StyledTableCell = styled.td`
  ${({ width = null }) => width !== null && { width: `${width}%` }};
  ${({ align = 'left', bold = false, italic = false }) => css`
    text-align: ${align};
    font-weight: ${bold ? 'bold' : 'normal'};
    font-style: ${italic ? 'italic' : 'normal'};
  `}
`;

// eslint-disable-next-line
export default function Table_v0_3({ title, header, rows, textAlignment }) {
  const containerRef = React.useRef(null);
  const tableRef = React.useRef(null);

  const [scale, setScale] = React.useState(1);

  const resize = useAutoCallback(() => {
    const { current: container } = containerRef;
    const { current: table } = tableRef;
    if (container && table) {
      setScale(container.offsetWidth / table.offsetWidth);
    }
  });

  React.useEffect(
    () => {
      setTimeout(resize, 100);
    },
    // eslint-disable-next-line
    []
  );

  useAutoEffect(() => {
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  });

  return (
    <Container ref={containerRef}>
      <TableTitle textAlignment={textAlignment}>{title}</TableTitle>
      <StyledTable ref={tableRef} scale={Math.min(1, scale)}>
        <thead>
          <tr>
            {header.map(({ text, ...cell }, index) => (
              <StyledTableCell as={'th'} key={index} {...cell}>
                {text}
              </StyledTableCell>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((columns, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map(({ text, ...cell }, columnIndex) => (
                <StyledTableCell key={columnIndex} {...cell}>
                  {text}
                </StyledTableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  );
}
