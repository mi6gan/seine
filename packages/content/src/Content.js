// @flow
import * as React from 'react';
import { useAutoMemo } from 'hooks.macro';

import BlocksContext from './BlocksContext';
import useBlock from './useBlock';
import useBlockChildren from './useBlockChildren';
import useBlockComponent from './useBlockComponent';
import useScreenDevice from './useScreenDevice';

import { ResizeObserverProvider, ThemeProvider } from '@seine/styles';
import type { Block } from '@seine/core';

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
  const block = useBlock(id);
  const body = block.body;
  const blockChildren = useBlockChildren(id);
  const BlockComponent = useBlockComponent(block.type);
  const device = useScreenDevice(initialDevice);
  const format = {
    ...block.format,
    ...(block.format && block.format[device]),
  };

  return (
    <BlockComponent
      id={id}
      editor={block.editor}
      {...format}
      {...body}
      {...(blockChildren.length > 0 && {
        children: blockChildren.map((block, index, { length }) => (
          <ContentBlock
            {...block}
            key={block.id}
            device={device}
            hasSibling={length > 1}
          />
        )),
      })}
    />
  );
}

/**
 * @description Content blocks renderer.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Content({
  children,
  device,
  blockRenderMap = null,
}: Props) {
  const defaultBlocks = React.useContext(BlocksContext);
  const [rootBlock = null] = children;
  return (
    <ThemeProvider>
      <BlocksContext.Provider
        value={useAutoMemo({
          ...defaultBlocks,
          ...(blockRenderMap && { blockRenderMap }),
          blocks: children,
        })}
      >
        <ResizeObserverProvider>
          <ContentBlock id={rootBlock && rootBlock.id} device={device} />
        </ResizeObserverProvider>
      </BlocksContext.Provider>
    </ThemeProvider>
  );
}
