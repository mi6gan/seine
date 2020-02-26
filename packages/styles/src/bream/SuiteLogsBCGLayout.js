// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import { BootstrapTypography } from '@seine/styles';

import BootstrapContainer from './BootstrapContainer';
import BootstrapRow from './BootstrapRow';
import ThemePaper from './ThemePaper';
import BootstrapColumn from './BootstrapColumn';
import BootstrapBox from './BootstrapBox';
import SuiteLogsHeader from './SuiteLogsHeader';
import BootstrapFlex from './BootstrapFlex';

type Props = {
  children?: any,
  title: React.Node,
  description: React.Node,
  children: React.Node,
};

const ContentPaper = ({ forwardedAs = 'section', ...props }) => (
  <ThemePaper forwardedAs={forwardedAs} {...props} />
);

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

const SubtitleTypography = ({
  as = BootstrapBox,
  forwarderAs = 'h4',
  ...props
}) => <BootstrapTypography as={as} forwardedAs={forwarderAs} {...props} />;

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
      <SuiteLogsHeader>{title}</SuiteLogsHeader>

      <BootstrapRow as={'article'} marginBottom={7} paddingX={5}>
        <BootstrapColumn
          xs={12}
          lg={4}
          as={ContentPaper}
          forwardedAs={BootstrapBox}
          paddingY={7}
        >
          {children}
        </BootstrapColumn>
        <BootstrapColumn
          xs={12}
          lg={8}
          as={DescriptionPaper}
          forwardedAs={BootstrapBox}
          paddingY={7}
        >
          <BootstrapFlex flexDirection={'column'} width={'100%'}>
            <ThemePaper
              as={SubtitleTypography}
              fontWeight={600}
              variant={'h4'}
              width={'100%'}
            >
              {subtitle}
            </ThemePaper>
            <BootstrapBox as={BootstrapTypography} marginY={7}>
              {description}
            </BootstrapBox>
          </BootstrapFlex>
        </BootstrapColumn>
      </BootstrapRow>
    </BootstrapContainer>
  );
}
