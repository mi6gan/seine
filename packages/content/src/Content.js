// @flow
import * as React from 'react';
import { useAutoMemo } from 'hooks.macro';

import BlocksContext from './BlocksContext';
import useBlock from './useBlock';
import useBlockChildren from './useBlockChildren';
import useBlockComponent from './useBlockComponent';
import useScreenDevice from './useScreenDevice';
import defaultBlockRenderMap from './blockRenderMap';

import { ResizeObserverProvider, ThemeProvider } from '@seine/styles';
import type { Block } from '@seine/core';
import { normalizeBlock } from '@seine/core';

export type Props = {
  blockRenderMap?: { [string]: ({ [string]: any }) => React.Node },
  device?: 'mobile' | 'any',
  children: Array<Block>,
};

/**
 * @description Content blocks renderer.
 * @param {Props} props
 * @returns {React.Node}
 */
function ContentBlock({ id, device: initialDevice }): React.Node {
  const blockChildren = useBlockChildren(id);
  const device = useScreenDevice(initialDevice);
  const { type, format, body, editor } = useBlock(id);
  const BlockComponent = useBlockComponent(type);

  return (
    <BlockComponent
      id={id}
      {...format}
      {...(format && format[device])}
      {...body}
      editor={editor}
    >
      {blockChildren.length > 0
        ? blockChildren.map(({ id }) => (
            <ContentBlock id={id} key={id} device={device} />
          ))
        : null}
    </BlockComponent>
  );
}

/**
 * @description Content blocks renderer.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Content({ children, device, blockRenderMap }: Props) {
  children = useAutoMemo(children.map(normalizeBlock));
  const [rootBlock = null] = children;
  return (
    <ThemeProvider>
      <BlocksContext.Provider
        value={{
          blockRenderMap: {
            ...defaultBlockRenderMap,
            ...blockRenderMap,
          },
          blocks: children,
        }}
      >
        <ResizeObserverProvider>
          <ContentBlock id={rootBlock && rootBlock.id} device={device} />
        </ResizeObserverProvider>
      </BlocksContext.Provider>
    </ThemeProvider>
  );
}
