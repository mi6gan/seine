// @flow
import * as React from 'react';

import * as richTextDefaults from './richtexts';
import * as tableDefaults from './tables';
import * as layoutDefaults from './layouts';
import * as chartDefaults from './charts';
import * as imageDefaults from './images';

import { blockTypes } from '@seine/core';

type Props = {
  itemDesignAs?: React.ComponentType,
  layoutDesignAs?: React.ComponentType,
  richTextDesignAs?: React.ComponentType,
  tableDesignAs?: React.ComponentType,
  chartDesignAs?: React.ComponentType,
  imageDesignAs?: React.ComponentType,
};

/**
 * @description Editor design panel.
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
}: Props) {
  const { layout, item } = layoutDefaults.useSelectedLayoutItems();

  return (
    <>
      {item && <ItemDesign />}
      {layout && <LayoutDesign />}
      {item && item.type === blockTypes.RICH_TEXT && <RichTextDesign />}
      {item && item.type === blockTypes.TABLE && <TableDesign />}
      {item && item.type === blockTypes.CHART && <ChartDesign />}
      {item && item.type === blockTypes.IMAGE && <ImageDesign />}
    </>
  );
}
