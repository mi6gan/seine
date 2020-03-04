// @flow
import * as React from 'react';

import BootstrapBox from '../BootstrapBox';
import BootstrapButton from '../BootstrapButton';
import BootstrapColumn from '../BootstrapColumn';
import BootstrapFlex from '../BootstrapFlex';
import BootstrapRow from '../BootstrapRow';
import BootstrapTypography from '../BootstrapTypography';

import exclamationMarkBlueIcon from './img/icons/exclamation-mark-blue.svg';
import shareIcon from './img/icons/ico-share-white.svg';
import ThemeSvgIcon from './ThemeSvgIcon';
import ThemePaper from './ThemePaper';

type Props = {
  children: string,
  shareButtonAs?: React.ElementType,
};

/**
 * @description Output greetings and share button of suite log review results.
 * {Props} props
 * @returns {React.Node}
 */
export default function SuiteLogsReviewGreeting({
  children,
  shareButtonAs: ShareButton = null,
  modalId = Math.random() < 0.5 ? 'shareResults' : 'shareResultsRocket',
}: Props) {
  return (
    <ThemePaper
      variant={'two'}
      as={BootstrapFlex}
      forwardedAs={BootstrapBox}
      height={'100%'}
      width={'100%'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <BootstrapRow
        alignItems={'center'}
        justifyContent={'space-between'}
        height={'100%'}
      >
        <BootstrapColumn
          as={BootstrapFlex}
          alignItems={'center'}
          justifyContent={'space-between'}
          sm={ShareButton ? 7 : 12}
          xl={ShareButton ? 7 : 12}
        >
          <BootstrapTypography
            variant={'h3'}
            fontWeight={600}
            {...(ShareButton ? { alignItems: 'center' } : {})}
            noMargin
          >
            <BootstrapRow
              alignItems={'center'}
              justifyContent={'space-between'}
              height={'100%'}
              flexWrap={'nowrap'}
            >
              <BootstrapColumn
                as={BootstrapFlex}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <BootstrapBox
                  as={ThemeSvgIcon}
                  forwardedAs={'span'}
                  src={exclamationMarkBlueIcon}
                />
              </BootstrapColumn>
              <BootstrapColumn
                as={BootstrapFlex}
                alignItems={'center'}
                justifyContent={'space-between'}
                paddingLeft={0}
                paddingRight={0}
              >
                <BootstrapBox
                  as={BootstrapTypography}
                  forwardedAs={'span'}
                  variant={'h3'}
                  fontWeight={600}
                  noMargin
                  paddingRight={1}
                >
                  {children}
                </BootstrapBox>
              </BootstrapColumn>
            </BootstrapRow>
          </BootstrapTypography>
        </BootstrapColumn>

        {ShareButton && (
          <BootstrapColumn as={BootstrapFlex}>
            <BootstrapButton
              id={modalId}
              as={ShareButton}
              backgroundColor={'#71A2FF'}
              color={'white'}
              borderRadius={'3px'}
            >
              <img src={shareIcon} alt={'share icon'} />
              <BootstrapBox as={'span'} noMargin paddingLeft={5}>
                Share result
              </BootstrapBox>
            </BootstrapButton>
          </BootstrapColumn>
        )}
      </BootstrapRow>
    </ThemePaper>
  );
}
