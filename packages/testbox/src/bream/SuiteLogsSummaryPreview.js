// @flow
import * as React from 'react';

import BootstrapContainer from '../BootstrapContainer';

import SuiteLogsReviewHeader from './SuiteLogsReviewHeader';
import BreamThemeProvider from './BreamThemeProvider';

type Props = { [string]: any };

/**
 * @description Public preview of suite log summary.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function SuiteLogsSummaryPreview(props: Props) {
  return (
    <BreamThemeProvider>
      <BootstrapContainer fluid>
        <SuiteLogsReviewHeader {...props} />
      </BootstrapContainer>
    </BreamThemeProvider>
  );
}
