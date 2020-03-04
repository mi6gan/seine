import * as React from 'react';
import { BreamThemeProvider } from '@seine/testbox';

import BootstrapContainer from '../BootstrapContainer';

import useBreamStoryEffect from './useBreamStoryEffect';
import SuiteLogsReviewHeader from './SuiteLogsReviewHeader';

export default { title: 'Bream.Review summary header' };

const ThemedSuiteLogsHeader = (props) => {
  useBreamStoryEffect(...document.children);
  return (
    <BreamThemeProvider>
      <BootstrapContainer>
        <SuiteLogsReviewHeader {...props} />
      </BootstrapContainer>
    </BreamThemeProvider>
  );
};

export const GoodPerformance = ({
  as: Container = ThemedSuiteLogsHeader,
  ...props
}) => <Container performance={50} duration={'00:10:00'} {...props} />;

export const BadPerformance = ({
  as: Container = GoodPerformance,
  ...props
}) => <Container performance={10} {...props} />;

export const GreatPerformance = ({
  as: Container = BadPerformance,
  ...props
}) => <Container performance={100} {...props} />;
