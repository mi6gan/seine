// @flow
import * as React from 'react';
import { useAutoEffect, useAutoMemo } from 'hooks.macro';

import BlocksContext from './BlocksContext';
import useBlock from './useBlock';
import useBlockChildren from './useBlockChildren';
import useBlockComponent from './useBlockComponent';

import { ResizeObserverProvider, ThemeProvider, useTheme } from '@seine/styles';
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
function ContentBlock({
  id,
  device: initialDevice = 'any',
  ...blockProps
}): React.Node {
  const block = useBlock(id);
  const blockChildren = useBlockChildren(id);
  const BlockComponent = useBlockComponent(block.type);

  const theme = useTheme();
  const mql = useAutoMemo(
    initialDevice === 'auto' &&
      window.matchMedia(theme.breakpoints.up('md').replace('@media ', ''))
  );
  const [screenDevice, setScreenDevice] = React.useState('any');

  const device = initialDevice === 'auto' ? screenDevice : initialDevice;

  useAutoEffect(() => {
    if (mql) {
      const handler = () => {
        setScreenDevice(mql.matches ? 'any' : 'mobile');
      };

      mql.addEventListener('change', handler);

      return () => {
        mql.removeEventListener('change', handler);
      };
    }
  });

  return (
    <BlockComponent
      id={id}
      {...blockProps}
      {...(block.format &&
        (device === 'any'
          ? block.format
          : {
              ...block.format,
              ...block.format[device],
            }))}
      {...block.body}
    >
      {blockChildren.length
        ? blockChildren.map(({ id }, index, { length }) => (
            <ContentBlock
              id={id}
              key={id}
              device={device}
              hasSibling={length > 1}
              parentType={block.type}
            />
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
export default function Content({
  children,
  blockRenderMap = null,
  ...contentProps
}: Props) {
  const defaultBlocks = React.useContext(BlocksContext);
  const [rootBlock = null] = children;
  return (
    <ResizeObserverProvider>
      <ThemeProvider>
        <BlocksContext.Provider
          value={useAutoMemo({
            ...defaultBlocks,
            ...(blockRenderMap && { blockRenderMap }),
            blocks: children,
          })}
        >
          {rootBlock && <ContentBlock id={rootBlock.id} {...contentProps} />}
        </BlocksContext.Provider>
      </ThemeProvider>
    </ResizeObserverProvider>
  );
}
