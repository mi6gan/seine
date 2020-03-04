// @flow
import styled from 'styled-components/macro';

import BootstrapFlex from './BootstrapFlex';

export type Props = {};

const BootstrapProgress = styled(
  BootstrapFlex
).attrs(({ width = '8.4rem' }) => ({ width }))`
  @keyframes progress-bar-stripes {
    from {
      background-position: ${({ width }) =>
        `${width}${typeof width === 'number' ? 'px' : ''} 0`};
    }
    to {
      background-position: 0 0;
    }
  }

  overflow: hidden;
  font-size: 0.75rem;
  background-color: #ebebeb;
  transition: width 0.6s ease;
  animation: progress-bar-stripes 1s linear infinite;
`;

export default BootstrapProgress;
