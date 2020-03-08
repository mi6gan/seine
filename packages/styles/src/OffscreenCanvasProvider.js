// @flow
import * as React from 'react';
import styled from 'styled-components/macro';

import Typography from './Typography';
import OffscreenCanvasContext from './OffscreenCanvasContext';
import useResizeTargetRef from './useResizeTargetRef';

const StyledCanvas = styled(Typography).attrs(
  ({ as = 'canvas', width = '100%', height = '100%' }) => ({
    as,
    width,
    height,
  })
)`
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  word-spacing: 0;
  white-space: nowrap;
`;

type Props = {
  children: React.Node,
};

/**
 * @description HTML canvas provider.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function OffscreenCanvasProvider({
  children,
  ...canvasProps
}: Props) {
  const canvasRef = useResizeTargetRef();
  const { current: canvas } = canvasRef;

  return (
    <OffscreenCanvasContext.Provider value={canvas}>
      <StyledCanvas
        ref={canvasRef}
        width={canvas && canvas.parentElement.offsetWidth}
        height={canvas && canvas.parentElement.offsetHeight}
        {...canvasProps}
      />
      {canvas && children}
    </OffscreenCanvasContext.Provider>
  );
}
