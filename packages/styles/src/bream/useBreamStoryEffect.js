// @flow
import { useAutoLayoutEffect } from 'hooks.macro';

import '../../dist/bream/styles/css/stories.css';

/**
 * @description Set class attribute of document html element.
 * @param {HTMLHtmlElement} html
 */
export default function useBreamStoryEffect(html: HTMLHtmlElement) {
  useAutoLayoutEffect(() => {
    html.classList.add('bream');
    return () => {
      html.classList.remove('bream');
    };
  });
}
