// @flow
import styled, { css } from 'styled-components/macro';

const Layout_v0_3 = styled.div`
  display: grid;
  position: relative;
  ${({
    columns = 'repeat(auto-fit, minmax(150px, 1fr))',
    columnGap = 25,
    rows = '',
    rowGap = 25,
  }) => css`
    grid-template-columns: ${columns};
    grid-template-rows: ${rows};
    grid-row-gap: ${Number.isFinite(rowGap) ? `${rowGap}px` : rowGap};
    grid-column-gap: ${Number.isFinite(columnGap)
      ? `${columnGap}px`
      : columnGap};
  `}
`;

export default Layout_v0_3;
