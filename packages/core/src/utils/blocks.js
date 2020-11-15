// @flow
import uuid from 'uuid/v4';

import type {
  Block,
  BlockBody,
  BlockFormat,
  BlockId,
  BlockType,
} from '../types';
import {
  blockTypes,
  chartTypes,
  defaultBarChartFormat,
  defaultChartFormat,
  defaultColumnChartFormat,
  defaultFlexFormat,
  defaultGridFormat,
  defaultImageFormat,
  defaultLayoutFormat,
  defaultLineChartFormat,
  defaultPageFormat,
  defaultPieChartFormat,
  defaultRichTextFormat,
  defaultTableFormat,
  layoutTypes,
} from '../types';

type Blocks = $ReadOnlyArray<Block>;
type BlocksTree = Block & {
  children: BlocksTree[],
};

const defaultBlockBody = {};
const defaultBlockFormat = {};

/**
 * @description Create a block of the parent.
 * @param {BlockType} type
 * @param {?BlockBody} body
 * @param {?BlockFormat} format
 * @param {?BlockId} parent_id
 * @returns {Block}
 */
export function createBlock(
  type: BlockType,
  body: ?BlockBody = null,
  format: ?BlockFormat = null,
  parent_id: ?BlockId = null
): Block {
  body = body || defaultBlockBody;
  format = format || defaultBlockFormat;
  return { id: uuid(), type, body, format, parent_id };
}

/**
 * @description Create clone of a block.
 * @param {Block} block
 * @returns {Block}
 */
export function cloneBlock(block: Block): Block {
  return { ...block, id: uuid() };
}

/**
 * @description Get all block ancestors.
 * @param {BlockId} id
 * @param {Blocks[]} blocks
 * @returns {Blocks[]}
 */
export function filterBlockAncestors(id: BlockId, blocks: Block[]): Block {
  return blocks.reduce(
    (acc, block, index) =>
      block['parent_id'] === id
        ? [...acc, ...filterBlockAncestors(block.id, blocks.slice(index))]
        : block.id === id
        ? [...acc, block]
        : acc,
    []
  );
}

/**
 * @description Create blocks from tree.
 * @param {Block} parent
 * @param {BlocksTree[]} tree
 * @returns {Block[]}
 */
export function createBlocksFromTree(parent, tree: BlocksTree[]): Blocks[] {
  return [
    parent,
    ...tree.reduce((acc, { children, body, format, type }) => {
      const block = createBlock(type, body, format, parent.id);
      return [
        ...acc,
        ...(children ? createBlocksFromTree(block, children) : [block]),
      ];
    }, []),
  ];
}

/**
 * @description  Return true if block is a container (may have children blocks).
 * @param {Block} block
 * @returns {boolean}
 */
export function isBlockContainer(block: Block) {
  return block.type === blockTypes.PAGE || block.type === blockTypes.LAYOUT;
}

/**
 * @description  Return default block format.
 * @param {Block} block
 * @returns {BlockFormat}
 */
export function getDefaultBlockFormat({ type, format }: Block) {
  switch (type) {
    case blockTypes.CHART: {
      switch (format && format.kind) {
        case chartTypes.COLUMN:
          return defaultColumnChartFormat;
        case chartTypes.BAR:
          return defaultBarChartFormat;
        case chartTypes.PIE:
          return defaultPieChartFormat;
        case chartTypes.LINE:
          return defaultLineChartFormat;
        default:
          return defaultChartFormat;
      }
    }

    case blockTypes.IMAGE:
      return defaultImageFormat;

    case blockTypes.LAYOUT: {
      switch (format && format.kind) {
        case layoutTypes.FLEX:
          return defaultFlexFormat;
        case layoutTypes.GRID:
          return defaultGridFormat;
        default:
          return defaultLayoutFormat;
      }
    }

    case blockTypes.PAGE:
      return defaultPageFormat;

    case blockTypes.RICH_TEXT:
      return defaultRichTextFormat;

    case blockTypes.TABLE:
      return defaultTableFormat;

    default:
      return format;
  }
}

/**
 * @description  Return normalized block format.
 * @param {Block} block
 * @returns {BlockFormat}
 */
export function getBlockFormat(block: Block) {
  return {
    ...getDefaultBlockFormat(block),
    ...block.format,
  };
}

/**
 * @description  Return normalized block.
 * @param {Block} block
 * @returns {BlockFormat}
 */
export function normalizeBlock(block: Block) {
  return {
    ...block,
    format: getBlockFormat(block),
  };
}
