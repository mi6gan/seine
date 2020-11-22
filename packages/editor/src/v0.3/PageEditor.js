// @flow
import * as React from 'react';

import { Page_v0_3 as Page } from '@seine/content';
import { Paper } from '@seine/styles/mui-core.macro';
import { Box } from '@seine/styles';

// eslint-disable-next-line
export default function PageEditor_v0_3(props) {
  return (
    <Box as={Paper} overflow={'auto'} p={4}>
      <Page {...props} />
    </Box>
  );
}
