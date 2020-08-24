// @flow
import * as React from 'react';
import { useAutoMemo } from 'hooks.macro';
import type { Block } from '@seine/core';
import { ResizeObserverProvider, ThemeProvider } from '@seine/styles';

import defaultBlockRenderMap from './blockRenderMap';

export type Props = {
  blockRenderMap?: { [string]: ({ [string]: any }) => React.Node },
  children: $ReadOnlyArray<Block>,
  parent: Block,
  device: 'mobile' | 'any',
};

/**
 * @description Content blocks renderer.
 * @param {Props} props
 * @returns {React.Node}
 */
function Content({
  blockRenderMap = defaultBlockRenderMap,
  children,
  parent,
  device = 'any',
  as: Container = parent['parent_id'] ? React.Fragment : Provider,
  ...containerProps
}: Props): React.Node {
  return (
    <Container {...containerProps}>
      {children
        .filter((block: Block) => block['parent_id'] === parent.id)
        .map(({ body, format, ...block }: Block, { length }) => {
          const ContentBlock = blockRenderMap[block.type];
          const blockChildren = children.filter(
            (content) => content.id !== block.id
          );
          return (
            <ContentBlock
              key={block.id}
              parentType={parent.type}
              {...(format
                ? device === 'any'
                  ? format
                  : { ...format, ...format[device] }
                : {})}
              {...(body ? body : {})}
              {...block}
              hasSibling={length > 1}
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
      {useAutoMemo(<ResizeObserverProvider>{children}</ResizeObserverProvider>)}
    </ThemeProvider>
  );
}

export default Content;
