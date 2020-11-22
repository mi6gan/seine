// @flow
import * as React from 'react';

import defaultBlockRenderMap from './defaultBlockRenderMap';
import {
  Image_v0_3,
  Layout_v0_3,
  Page_v0_3,
  RichText_v0_3,
  Table_v0_3,
  Chart_v0_3,
} from './v0.3';

import { blockTypes } from '@seine/core';

const blockRenderMap_v0_3 = {
  [blockTypes.IMAGE]: Image_v0_3,
  [blockTypes.LAYOUT]: Layout_v0_3,
  [blockTypes.PAGE]: Page_v0_3,
  [blockTypes.RICH_TEXT]: RichText_v0_3,
  [blockTypes.TABLE]: Table_v0_3,
  [blockTypes.CHART]: Chart_v0_3,
};

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
