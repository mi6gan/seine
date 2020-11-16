// @flow
import * as React from 'react';

import BlocksContext from './BlocksContext';
import useBlock from './useBlock';
import useBlockChildren from './useBlockChildren';
import useBlockComponent from './useBlockComponent';
import useScreenDevice from './useScreenDevice';
import defaultBlockRenderMap from './blockRenderMap';
import useNormalizedBlocks from './useNormalizedBlocks';

import { ThemeProvider } from '@seine/styles';
import type { Block, ScreenDevice } from '@seine/core';

export type Props = {
  blockRenderMap?: { [string]: ({ [string]: any }) => React.Node },
  device?: ScreenDevice | 'auto',
  children: Array<Block>,
};

/**
 * @description Content blocks renderer.
 * @param {Props} props
 * @returns {React.Node}
 */
function ContentBlock({ id }): React.Node {
  const blockChildren = useBlockChildren(id);
  const { type, format, body, editor } = useBlock(id);
  const BlockComponent = useBlockComponent(type);

  return (
    <BlockComponent id={id} {...format} {...body} editor={editor}>
      {blockChildren.length > 0
        ? blockChildren.map(({ id }) => <ContentBlock id={id} key={id} />)
        : null}
    </BlockComponent>
  );
}

/**
 * @description Content blocks renderer.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Content({
  children,
  device: initialDevice,
  blockRenderMap,
}: Props) {
  const [rootBlock = null] = children;
  const device = useScreenDevice(initialDevice);
  const blocks = useNormalizedBlocks(children, device);
  return (
    <ThemeProvider>
      <BlocksContext.Provider
        value={{
          blockRenderMap: {
            ...defaultBlockRenderMap,
            ...blockRenderMap,
          },
          blocks,
        }}
      >
        <ResizeObserverProvider>
          <ContentBlock id={rootBlock && rootBlock.id} />
        </ResizeObserverProvider>
      </BlocksContext.Provider>
    </ThemeProvider>
  );
}
