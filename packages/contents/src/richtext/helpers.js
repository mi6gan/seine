// @flow
import {
  EditorState,
  ContentState,
  CompositeDecorator,
  convertFromHTML,
  convertFromRaw,
  convertToRaw,
} from 'draft-js';

/**
 * @description Transform a value to editor state of draft-js.
 * @param {any} value
 * @param {CompositeDecorator} decorator
 * @returns {EditorState}
 */
export function toDraftEditor(value: any, decorator?: CompositeDecorator) {
  if (value && value instanceof EditorState) {
    return value;
  }
  return EditorState.createWithContent(toDraftContent(value), decorator);
}

/**
 * @description Transform a value to content state of draft-js.
 * @param {any} value
 * @returns {ContentState}
 */
export function toDraftContent(value: any) {
  value = value || '';
  if (value instanceof ContentState) {
    return value;
  } else if (value instanceof EditorState) {
    return value.getCurrentContent();
  } else if (
    typeof value === 'object' &&
    Array.isArray(value.blocks) &&
    value.blocks.length &&
    typeof value.entityMap === 'object'
  ) {
    return convertFromRaw(value);
  } else if (typeof value === 'string') {
    if (value.startsWith('<') && value.endsWith('>')) {
      const blocksFromHTML = convertFromHTML(value);
      if (blocksFromHTML && blocksFromHTML.contentBlocks) {
        return ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
      }
    }
    return ContentState.createFromText(value);
  }
  return ContentState.createFromText('');
}

/**
 *  @description Transform a value to serializable content state of draft-js.
 *  @param {any} value
 *  @returns {object}
 */
export const toRawContent = (value: any) => convertToRaw(toDraftContent(value));
