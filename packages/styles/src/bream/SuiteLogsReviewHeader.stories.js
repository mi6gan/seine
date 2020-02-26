import * as React from 'react';

import ThemeProvider from '../ThemeProvider';

import useBreamStoryEffect from './useBreamStoryEffect';
import BootstrapContainer from './BootstrapContainer';
import SuiteLogsReviewHeader from './SuiteLogsReviewHeader';
import theme from './theme';

export default { title: 'Bream.Review summary header' };

const ThemedSuiteLogsHeader = (props) => {
  useBreamStoryEffect(...document.children);
  return (
    <ThemeProvider theme={theme}>
      <BootstrapContainer>
        <SuiteLogsReviewHeader {...props} />
      </BootstrapContainer>
    </ThemeProvider>
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
