// @flow
import {
  CREATE_BLOCK,
  CREATE_BOTTOM_BLOCK,
  CREATE_LEFT_BLOCK,
  CREATE_RIGHT_BLOCK,
  CREATE_TOP_BLOCK,
  SELECT_BLOCK,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_EDITOR,
  UPDATE_BLOCK_FORMAT,
} from './reduceBlocks';

import type { BlockId, BlocksAction } from '@seine/core';

type BlocksActionType = $PropertyType<BlocksAction, 'type'>;
type BlocksActionPayload = $Rest<BlocksAction, BlocksActionType>;

/**
 * @description Create normalized blocks reducer action.
 * @param {BlocksActionType} type
 * @param {BlocksActionPayload} data
 * @param {?BlockId} id
 * @returns {BlocksAction}
 */
export default function createBlocksAction(
  type: BlocksActionType,
  data: BlocksActionPayload,
  id: ?BlockId = null
) {
  const { mode = null, modifier = null } = type === SELECT_BLOCK && data;
  const block =
    type === CREATE_BLOCK ||
    type === CREATE_BOTTOM_BLOCK ||
    type === CREATE_RIGHT_BLOCK ||
    type === CREATE_LEFT_BLOCK ||
    type === CREATE_TOP_BLOCK
      ? data
      : null;
  const body = type === UPDATE_BLOCK_BODY ? data : null;
  const format = type === UPDATE_BLOCK_FORMAT ? data : null;
  const editor = type === UPDATE_BLOCK_EDITOR ? data : null;

  return {
    ...(id && { id }),
    ...(body && { body }),
    ...(format && { format }),
    ...(editor && { editor }),
    ...(mode && { mode }),
    ...(modifier && { modifier }),
    ...(block && { block }),
    type,
  };
}
