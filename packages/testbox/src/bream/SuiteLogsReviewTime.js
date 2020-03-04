// @flow
import React from 'react';

import BootstrapFlex from '../BootstrapFlex';
import BootstrapTypography from '../BootstrapTypography';

import Duration from './Duration';
import ThemePaper from './ThemePaper';

type Props = {
  children: string | number,
};

/**
 * @description Output suite log review time.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function SuiteLogsReviewTime({ children }: Props) {
  return (
    <ThemePaper
      variant={'two'}
      as={BootstrapFlex}
      height={'100%'}
      width={'100%'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <BootstrapTypography variant={'h3'} fontWeight={600} noMargin>
        Your Time
      </BootstrapTypography>

      <BootstrapTypography variant={'h1'} fontWeight={'bold'} noMargin>
        <Duration>{children}</Duration>
      </BootstrapTypography>
    </ThemePaper>
  );
}
