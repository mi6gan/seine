// @flow
import styled from 'styled-components/macro';

import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from './constants';

const ChartSvg = styled.svg.attrs(
  ({
    overflow = 'hidden',
    width = '100%',
    height = 'auto',
    viewBox = `0 0 ${VIEWPORT_WIDTH} ${VIEWPORT_HEIGHT}`,
  }) => ({ overflow, width, height, viewBox })
)`
  && {
    transform: translateZ(0);
    ${({ overflow, width, height }) => ({ overflow, width, height })};
  }
`;

export default ChartSvg;
