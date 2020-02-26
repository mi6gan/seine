// @flow
import React from 'react';
import styled from 'styled-components/macro';

import BootstrapBox from './BootstrapBox';
import BootstrapFlex from './BootstrapFlex';
import BootstrapProgress from './BootstrapProgress';
import BootstrapTypography from './BootstrapTypography';
import ThemePaper from './ThemePaper';

const OuterProgress = styled(BootstrapProgress).attrs(
  ({ width = '100%', height = '100%', position = 'relative' }) => ({
    width,
    height,
    position,
  })
)`
  background-color: ${({ value, theme: { bootstrap } }) =>
    value > 70
      ? bootstrap.greenLight
      : value <= 40
      ? bootstrap.redLight
      : bootstrap.yellowLight};

}))`;

const InnerProgress = styled(BootstrapBox).attrs(({ value }) => ({
  width: `${value}%`,
  role: 'progressbar',
  'aria-valuenow': value,
  'aria-valuemin': 0,
  'aria-valuemax': 100,
}))`
  height: 100%;
  background-color: ${({ value, theme: { bootstrap } }) =>
    value > 70
      ? bootstrap.green
      : value <= 40
      ? bootstrap.red
      : bootstrap.yellow};
`;

type Props = {
  children: number,
};

/**
 * @description Output suite log review performance progress indicator.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function SuiteLogsReviewPerformance({ children }: Props) {
  return (
    <ThemePaper
      variant={'loader'}
      as={BootstrapFlex}
      height={'100%'}
      width={'100%'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <BootstrapTypography
        variant={'h3'}
        fontWeight={600}
        noMargin
        paddingRight={4}
      >
        Your Performance
      </BootstrapTypography>

      <BootstrapBox height={'100%'}>
        <OuterProgress value={children}>
          <InnerProgress value={children}>&nbsp;</InnerProgress>

          <BootstrapFlex
            position={'absolute'}
            height={'100%'}
            width={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <BootstrapTypography variant={'h1'} fontWeight={'bold'} noMargin>
              {children}%
            </BootstrapTypography>
          </BootstrapFlex>
        </OuterProgress>
      </BootstrapBox>
    </ThemePaper>
  );
}
