// @flow
import * as React from 'react';
import { useAutoEffect, useAutoMemo } from 'hooks.macro';

import defaultBlockRenderMap from './blockRenderMap';

import type { Block, BlockId } from '@seine/core';
import { ResizeObserverProvider, ThemeProvider, useTheme } from '@seine/styles';

export type Props = {
  blockRenderMap?: { [string]: ({ [string]: any }) => React.Node },
  device?: 'mobile' | 'any',
  children: $ReadOnlyArray<Block>,
  parent: BlockId,
};

// eslint-disable-next-line
function ContentBlock({
  blockRenderMap,
  body,
  format,
  device,
  children,
  ...block
}: Block) {
  const ContentRender = blockRenderMap[block.type];
  return (
    <ContentRender
      key={block.id}
      {...(format
        ? device === 'any'
          ? format
          : { ...format, ...format[device] }
        : {})}
      {...(body ? body : {})}
      {...block}
    >
      {children}
    </ContentRender>
  );
}

/**
 * @description Content blocks renderer.
 * @param {Props} props
 * @returns {React.Node}
 */
function Content({
  blockRenderMap = defaultBlockRenderMap,
  children,
  parent,
  device: initialDevice = 'auto',
  as: Container = parent['parent_id'] ? React.Fragment : Provider,
  ...containerProps
}: Props): React.Node {
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
    <Container {...containerProps}>
      {children
        .filter((block: Block) => block['parent_id'] === parent.id)
        .map((block: Block, { length }) => {
          const blockChildren = children.filter(
            (content) => content.id !== block.id
          );
          return (
            <ContentBlock
              {...block}
              blockRenderMap={blockRenderMap}
              device={device}
              key={block.id}
              hasSibling={length > 1}
              parentType={parent.type}
            >
              {blockChildren.length ? (
                <Content
                  device={device}
                  parent={block}
                  blockRenderMap={blockRenderMap}
                >
                  {blockChildren}
                </Content>
              ) : null}
            </ContentBlock>
          );
        })}
    </Container>
  );
}

type ProviderProps = {
  children?: React.Node,
};

/**
 * @description Content provider.
 * @param {ProviderProps} props
 * @returns {React.Node}
 */
function Provider({ children = null }: ProviderProps) {
  return (
    <ThemeProvider>
      <ResizeObserverProvider>{children}</ResizeObserverProvider>
    </ThemeProvider>
  );
}

export default Content;
