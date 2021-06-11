// @flow
import * as React from 'react';
import { useAutoCallback, useAutoMemo } from 'hooks.macro';
import { ServerStyleSheet } from 'styled-components/macro';

import { MenuButton } from './ui';
import { allBlocksSelector, useEditorSelector } from './blocks';
import ContextMenu from './ContextMenu';

import { Content } from '@seine/content';
import { Box } from '@seine/styles';

type Props = {
  menuButtonAs?: React.ComponentType,
};

/**
 * @description Default context menu.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function EditorMainMenu({
  menuButtonAs: MainMenuButton = MenuButton,
}: Props) {
  const blocks = useEditorSelector(allBlocksSelector);
  const linkRef = React.useRef(null);
  const contentRef = React.useRef(null);

  const sheet = useAutoMemo(blocks && new ServerStyleSheet());

  return (
    <>
      <ContextMenu id={'main'}>
        <MainMenuButton
          onClick={useAutoCallback(() => {
            const content = document.createElement('div');
            content.innerHTML = contentRef.current.innerHTML;
            for (const svg of content.querySelectorAll('svg')) {
              const w = svg.getAttribute('width');
              const h = svg.getAttribute('height');
              if (!/^\d+(\.\d+)?$/.test(w) || !/^\d+$/.test(h)) {
                continue;
              }
              svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
              svg.setAttribute('width', '100%');
              svg.setAttribute('height', '100%');
              svg.style.position = 'static';
              svg.style.overflow = 'visible';
            }
            linkRef.current.href = URL.createObjectURL(
              new Blob(
                [
                  '<!DOCTYPE html>' +
                    '<html lang="en">' +
                    '<head>' +
                    '<title>Content</title>' +
                    sheet.getStyleTags() +
                    '</head>' +
                    `<body>${content.innerHTML}</body>` +
                    '</html>',
                ],
                { type: 'text/html' }
              )
            );
            linkRef.current.click();
          })}
        >
          <a
            href={'/'}
            download={'index.html'}
            target={'_blank'}
            ref={linkRef}
            rel={'noreferrer'}
          >
            &nbsp;
          </a>
          Export as HTML
        </MainMenuButton>
      </ContextMenu>
      <Box
        opacity={0}
        width={window.innerWidth}
        height={window.innerHeight}
        position={'absolute'}
        ref={contentRef}
      >
        {sheet.collectStyles(<Content>{blocks}</Content>)}
      </Box>
    </>
  );
}
