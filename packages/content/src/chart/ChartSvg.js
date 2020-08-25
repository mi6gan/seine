// @flow
import styled from 'styled-components/macro';

import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from './constants';

const ChartSvg = styled.svg.attrs(
  ({
    overflow = 'visible',
    width = '100%',
    height,
    viewBox = `0 0 ${VIEWPORT_WIDTH} ${VIEWPORT_HEIGHT}`,
    preserveAspectRatio = 'xMidYMin meet',
  }) => ({
    overflow,
    viewBox,
    preserveAspectRatio,
    ...(width && { width }),
    ...(height && { height }),
  })
)`
  &,
  &:not(:root) {
    transform: translateZ(0);
    ${({ overflow }) => ({ overflow })};
    ${({ width = 'auto' }) => ({ width })};
    ${({ height = 'auto' }) => ({ height })};
    ${({ maxHeight }) => ({ maxHeight })};
  }
`;

export default ChartSvg;
