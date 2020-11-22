// @flow
import * as React from 'react';
import { useAutoCallback } from 'hooks.macro';

import {
  SidebarGroup,
  SidebarHeading,
  SidebarInput,
  SidebarLabel,
  SidebarSection,
  SidebarSelect,
} from '../ui';
import { useSelectedLayoutItems } from '../layouts';
import { useBlocksDispatch } from '../blocks';

import { Update as UpgradeIcon } from '@seine/styles/mui-icons.macro';
import { IconButton } from '@seine/styles/mui-core.macro';
import { UPGRADE_BLOCK_VERSION } from '@seine/core';

const ObsoleteDesign = React.forwardRef(function ObsoleteDesign(
  {
    inputAs: Input = SidebarInput,
    selectAs: Select = SidebarSelect,
    ...sectionProps
  }: Props,
  ref
) {
  const {
    item: { id },
  } = useSelectedLayoutItems(true);
  const dispatch = useBlocksDispatch();

  return (
    <SidebarSection {...sectionProps} as={'form'} ref={ref} key={id}>
      <SidebarHeading>Obsolete content</SidebarHeading>

      <SidebarGroup>
        <SidebarLabel mr={3}>
          Block format is obsolete and not editable.
        </SidebarLabel>
        <IconButton
          title={'upgrade'}
          type={'button'}
          onClick={useAutoCallback(() => {
            dispatch({
              id,
              type: UPGRADE_BLOCK_VERSION,
            });
          })}
        >
          <UpgradeIcon />
        </IconButton>
      </SidebarGroup>
    </SidebarSection>
  );
});

export default (ObsoleteDesign: React.ComponentType<Props>);
