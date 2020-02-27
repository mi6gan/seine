// @flow
import * as React from 'react';
import styled from 'styled-components/macro';

import Typography from './Typography';
import OffscreenCanvasContext, {
  defaultOffscreenCanvas,
} from './OffscreenCanvasContext';

const StyledCanvas = styled(({ width = '100%', height = '100%', ...props }) => (
  <Typography {...props} as={'canvas'} width={width} height={height} />
))`
  position: fixed;
  z-index: -1;
  left: 0;
  top: 0;
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
  const [canvas, setCanvas] = React.useState(defaultOffscreenCanvas);

  return (
    <OffscreenCanvasContext.Provider value={canvas}>
      <StyledCanvas ref={setCanvas} {...canvasProps} />
      {children}
    </OffscreenCanvasContext.Provider>
  );
}
