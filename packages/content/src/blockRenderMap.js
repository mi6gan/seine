// @flow
import defaultBlockRenderMap from './defaultBlockRenderMap';
import { blockRenderMap_v0_3 } from './v0.3';

const blockRenderMap = {
  ...blockRenderMap_v0_3,
  ...defaultBlockRenderMap,
};

export default blockRenderMap;
