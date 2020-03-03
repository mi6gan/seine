// @flow
import styled from 'styled-components/macro';

import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from './constants';

const ChartSvg = styled.svg.attrs(
  ({
    overflow = 'hidden',
    width = '100%',
    height = '100%',
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
  ${({ overflow }) => ({ overflow })};
  ${({ width = 'auto' }) => ({ width })};
  ${({ height = 'auto' }) => ({ height })};
`;

export default ChartSvg;
