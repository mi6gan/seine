// @flow
import type { BlockId } from '../types';
import type { BlocksAction } from '../reducers';

import {
  CREATE_BLOCK,
  SELECT_BLOCK,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_EDITOR,
  UPDATE_BLOCK_FORMAT,
  MOVE_BLOCK,
} from './reduceBlocks';

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
  const block = type === CREATE_BLOCK ? data : null;
  const body = type === UPDATE_BLOCK_BODY ? data : null;
  const format = type === UPDATE_BLOCK_FORMAT ? data : null;
  const editor = type === UPDATE_BLOCK_EDITOR ? data : null;
  const { position = null, targetId = null } = type === MOVE_BLOCK && data;

  return {
    ...(id && { id }),
    ...(body && { body }),
    ...(format && { format }),
    ...(editor && { editor }),
    ...(mode && { mode }),
    ...(modifier && { modifier }),
    ...(block && { block }),
    ...(position && { position }),
    ...(targetId && { targetId }),
    type,
  };
}
