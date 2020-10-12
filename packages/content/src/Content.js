// @flow
import * as React from 'react';
import { useAutoMemo, useAutoEffect } from 'hooks.macro';

import defaultBlockRenderMap from './blockRenderMap';

import type { Block } from '@seine/core';
import { ResizeObserverProvider, ThemeProvider, useTheme } from '@seine/styles';

export type Props = {
  blockRenderMap?: { [string]: ({ [string]: any }) => React.Node },
  device?: 'mobile' | 'any',
  children: $ReadOnlyArray<Block>,
  parent: Block,
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
  device: initialDevice = 'auto',
  as: Container = parent['parent_id'] ? React.Fragment : Provider,
  ...containerProps
}: Props): React.Node {
  const theme = useTheme();
  const mql = useAutoMemo(
    initialDevice === 'auto' &&
      window.matchMedia(theme.breakpoints.up('md').replace('@media ', ''))
  );
  const [device, setDevice] = React.useState(initialDevice);

  useAutoEffect(() => {
    if (mql) {
      const handler = () => {
        setDevice(mql.matches ? 'any' : 'mobile');
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
