// @flow
import * as React from 'react';
import { ServerStyleSheet } from 'styled-components/macro';
import { useAutoCallback } from 'hooks.macro';

import { MenuButton } from './ui';
import { allBlocksSelector, useEditorSelector } from './blocks';
import ContextMenu from './ContextMenu';

import { Box } from '@seine/styles';
import { Content } from '@seine/content';

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
  const sheet = new ServerStyleSheet();

  return (
    <>
      <ContextMenu id={'main'}>
        <MainMenuButton
          onClick={useAutoCallback(() => {
            linkRef.current.href = URL.createObjectURL(
              new Blob(
                [
                  '<!DOCTYPE html>' +
                    '<html lang="en">' +
                    '<head>' +
                    '<title>Content</title>' +
                    sheet.getStyleTags() +
                    '</head>' +
                    `<body>${contentRef.current.innerHTML}</body>` +
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
