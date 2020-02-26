// @flow
import * as React from 'react';

import BootstrapRow from './BootstrapRow';
import BootstrapColumn from './BootstrapColumn';
import BootstrapTypography from './BootstrapTypography';
import BootstrapBox from './BootstrapBox';
import ThemePaper from './ThemePaper';

type Props = {
  as?: React.ElementType,
  children?: React.Node,
};

const HeaderTypography = ({
  as = BootstrapBox,
  forwardedAs = 'h3',
  ...props
}) => <BootstrapTypography as={as} forwardedAs={forwardedAs} {...props} />;

/**
 * @description Header of suite log page.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function SuiteLogsHeader({
  as = 'header',
  children = null,
}: Props) {
  return (
    <BootstrapRow as={as} paddingY={2} paddingX={5}>
      <BootstrapColumn
        as={ThemePaper}
        xs={12}
        marginBottom={3}
        paddingY={7}
        width={'100%'}
        flexShrink={10}
        forwardedAs={HeaderTypography}
        variant={'h3'}
        fontWeight={600}
      >
        {children}
      </BootstrapColumn>
    </BootstrapRow>
  );
}
