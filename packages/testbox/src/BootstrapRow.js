// @flow
import styled, { css } from 'styled-components/macro';

import BootstrapFlex from './BootstrapFlex';

export type Props = {};

const BootstrapRow = styled(BootstrapFlex).attrs(
  ({
    theme: { bootstrap },
    flexWrap = 'wrap',
    width = `calc(100% + ${bootstrap.gridGutterWidth}px)`,
  }) => ({
    flexWrap,
    width,
  })
)`
  ${({ theme: { bootstrap }, width }) => css`
    margin-left: -${bootstrap.gridGutterWidth / 2}px;
    width: ${width};
  `}
`;

export default BootstrapRow;
