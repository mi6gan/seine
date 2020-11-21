// @flow
import * as React from 'react';

import { defaultBlockRenderMap as blockRenderMap_v0_3 } from '../v0.3';

import defaultBlockRenderMap from './defaultBlockRenderMap';

const blockRenderMap = Object.keys(defaultBlockRenderMap).reduce(
  (acc, blockType) => ({
    ...acc,
    [blockType]: ({ version, ...props }) => {
      const Block = (version === '0.3'
        ? blockRenderMap_v0_3
        : defaultBlockRenderMap)[blockType];
      return <Block {...props} />;
    },
  }),
  {}
);

export default blockRenderMap;
