// @flow
import * as React from 'react';

import { Box } from '@seine/styles';

const RootShape = React.forwardRef(function RootShape(
  { children, parentType, version, ...props },
  ref
) {
  return (
    <Box {...props} as={'svg'} ref={ref} width={'100%'} height={'100%'}>
      {children}
    </Box>
  );
});

export default RootShape;
