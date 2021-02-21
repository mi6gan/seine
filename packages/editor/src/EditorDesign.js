// @flow
import * as React from 'react';

import * as richTextDefaults from './richtexts';
import * as tableDefaults from './tables';
import * as layoutDefaults from './layouts';
import * as chartDefaults from './charts';
import * as imageDefaults from './images';
import ObsoleteDesign from './v0.3/ObsoleteDesign';
import { ShapeDesign } from './shapes';

import { blockTypes, shapeTypes } from '@seine/core';

type Props = {
  itemDesignAs?: React.ComponentType,
  layoutDesignAs?: React.ComponentType,
  richTextDesignAs?: React.ComponentType,
  tableDesignAs?: React.ComponentType,
  chartDesignAs?: React.ComponentType,
  imageDesignAs?: React.ComponentType,
  children?: React.Node,
};

/**
 * @description Default design panel.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function EditorDesign({
  layoutDesignAs: LayoutDesign = layoutDefaults.LayoutDesign,
  itemDesignAs: ItemDesign = layoutDefaults.ItemDesign,
  richTextDesignAs: RichTextDesign = richTextDefaults.RichTextDesign,
  tableDesignAs: TableDesign = tableDefaults.TableDesign,
  chartDesignAs: ChartDesign = chartDefaults.ChartDesign,
  imageDesignAs: ImageDesign = imageDefaults.ImageDesign,
  children = null,
}: Props) {
  const { layout, item } = layoutDefaults.useSelectedLayoutItems();
  const { item: obsoleteItem } = layoutDefaults.useSelectedLayoutItems(true);
  const isObsolete = item !== obsoleteItem && obsoleteItem;

  return (
    <>
      {isObsolete && <ObsoleteDesign />}
      {item &&
        item.type !== blockTypes.PAGE &&
        !(
          item.type === blockTypes.SHAPE && item.format.kind !== shapeTypes.ROOT
        ) &&
        !isObsolete && <ItemDesign />}
      {layout && !isObsolete && <LayoutDesign />}
      {item && !isObsolete && item.type === blockTypes.RICH_TEXT && (
        <RichTextDesign />
      )}
      {item && !isObsolete && item.type === blockTypes.TABLE && <TableDesign />}
      {item && !isObsolete && item.type === blockTypes.CHART && <ChartDesign />}
      {item && !isObsolete && item.type === blockTypes.IMAGE && <ImageDesign />}
      {item && !isObsolete && item.type === blockTypes.SHAPE && <ShapeDesign />}
      {children}
    </>
  );
}
