// @flow
import * as React from 'react';

import BootstrapBox from '../BootstrapBox';
import BootstrapColumn from '../BootstrapColumn';
import BootstrapRow from '../BootstrapRow';

import SuiteLogsReviewPerformance from './SuiteLogsReviewPerformance';
import SuiteLogsReviewTime from './SuiteLogsReviewTime';
import SuiteLogsReviewGreeting from './SuiteLogsReviewGreeting';

type Props = {
  performance: string,
  duration: any,
  shareButtonAs?: React.ElementType,
};

/**
 * @description Output suite log review header.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function SuiteLogsReviewHeader({
  performance,
  duration,
  shareButtonAs,
}: Props) {
  return (
    <BootstrapRow>
      <BootstrapColumn
        as={BootstrapBox}
        marginBottom={8}
        xs={12}
        xl={3}
        xxl={3}
      >
        <SuiteLogsReviewPerformance>{performance}</SuiteLogsReviewPerformance>
      </BootstrapColumn>

      <BootstrapColumn
        as={BootstrapBox}
        marginBottom={8}
        xs={12}
        xl={3}
        xxl={3}
      >
        <SuiteLogsReviewTime>{duration}</SuiteLogsReviewTime>
      </BootstrapColumn>

      <BootstrapColumn
        as={BootstrapBox}
        marginBottom={8}
        xs={12}
        xl={6}
        xxl={6}
      >
        <SuiteLogsReviewGreeting
          shareButtonAs={performance > 40 ? shareButtonAs : false}
        >
          {performance > 70
            ? 'Great job, tell friends about your success!'
            : performance <= 40
            ? 'Keep on training, practice makes perfect!'
            : 'Good progress, keep calm and carry on!'}
        </SuiteLogsReviewGreeting>
      </BootstrapColumn>
    </BootstrapRow>
  );
}
