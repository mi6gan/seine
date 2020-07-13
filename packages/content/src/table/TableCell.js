// @flow
import styled, { css } from 'styled-components/macro';
import type { TableHeaderCell } from '@seine/core';

const TableCell = styled.td.attrs({
  meta: void 0,
})`
  ${({ width = null }: TableHeaderCell) =>
    width !== null && { width: `${width}%` }};
  ${({ align = 'left', bold = false, italic = false }: TableCell) => css`
    text-align: ${align};
    font-weight: ${bold ? 'bold' : 'normal'};
    font-style: ${italic ? 'italic' : 'normal'};
  `}
`;

export default TableCell;
