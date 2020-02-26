// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';

import BootstrapTypography from './BootstrapTypography';
import BootstrapContainer from './BootstrapContainer';
import BootstrapRow from './BootstrapRow';
import ThemePaper from './ThemePaper';
import BootstrapColumn from './BootstrapColumn';
import BootstrapBox from './BootstrapBox';
import BootstrapFlex from './BootstrapFlex';

type Props = {
  title: React.Node,
  subtitle: React.Node,
  description: React.Node,
  children: React.Node,
};

const ContentPaper = ({
  as = BootstrapBox,
  forwardedAs = 'section',
  ...props
}) => <ThemePaper as={as} forwardedAs={forwardedAs} {...props} />;

const StyledDescriptionPaper = styled(ThemePaper)`
  ${({ theme: { breakpoints } }) => css`
    ${breakpoints.up('lg')} {
      border-left: none;
    }
    ${breakpoints.down('md')} {
      border-top: none;
    }
  `}
`;

const DescriptionPaper = ({ forwardedAs = 'section', ...props }) => (
  <StyledDescriptionPaper forwardedAs={forwardedAs} {...props} />
);

const TitleTypography = ({
  as = BootstrapBox,
  forwardedAs = 'h3',
  ...props
}) => <BootstrapTypography as={as} forwardedAs={forwardedAs} {...props} />;

const SubtitleTypography = styled(
  ({ as = BootstrapBox, forwarderAs = 'h4', ...props }) => (
    <BootstrapTypography as={as} forwardedAs={forwarderAs} {...props} />
  )
)`
  ${({ theme: { breakpoints } }) => css`
    ${breakpoints.up('lg')} {
      text-align: center;
    }
    ${breakpoints.down('md')} {
      text-align: left;
    }
  `}
`;

const SubtitleRuler = styled(BootstrapBox).attrs(
  ({ width = '100%', height = 1 }) => ({
    height,
    width,
  })
)`
  ${({ theme: { breakpoints, bootstrap } }) => css`
    ${breakpoints.down('md')} {
      display: none;
    }
    background-color: ${bootstrap.borderColor};
    border: none;
  `}
`;

/**
 * @description Layout of BCG page.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function SuiteLogsBCGLayout({
  as = 'main',
  title,
  subtitle,
  description,
  children,
}: Props) {
  return (
    <BootstrapContainer as={as}>
      <BootstrapRow as={'header'} paddingY={2} paddingX={5}>
        <BootstrapColumn
          as={ThemePaper}
          xs={12}
          marginBottom={3}
          paddingY={7}
          width={'100%'}
          forwardedAs={TitleTypography}
          variant={'h3'}
          fontWeight={600}
        >
          {title}
        </BootstrapColumn>
      </BootstrapRow>

      <BootstrapRow as={'article'} marginBottom={7} paddingX={5}>
        <BootstrapColumn xs={12} lg={4} as={ContentPaper} paddingY={7}>
          <BootstrapBox as={BootstrapTypography} variant={'body1'} paddingX={5}>
            {children}
          </BootstrapBox>
        </BootstrapColumn>

        <BootstrapColumn
          xs={12}
          lg={8}
          as={DescriptionPaper}
          forwardedAs={BootstrapBox}
          paddingY={7}
        >
          <BootstrapFlex flexDirection={'column'} width={'100%'}>
            <BootstrapBox
              as={SubtitleTypography}
              fontWeight={600}
              variant={'h4'}
              width={'100%'}
              paddingX={5}
            >
              {subtitle}
            </BootstrapBox>
            <SubtitleRuler forwardedAs={'hr'} marginTop={7} />

            <BootstrapBox as={BootstrapTypography} marginY={7} paddingX={5}>
              {description}
            </BootstrapBox>
          </BootstrapFlex>
        </BootstrapColumn>
      </BootstrapRow>
    </BootstrapContainer>
  );
}
