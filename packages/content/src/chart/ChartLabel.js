// @flow
import styled from 'styled-components/macro';
import { Chart } from '@devexpress/dx-react-chart-material-ui';
import { palette, typography } from '@material-ui/system';

const ChartLabel = styled(Chart.Label).attrs(
  ({ variant = 'body1', theme, ...props }) => ({
    ...theme.typography[variant],
    ...props,
  })
)`
  && {
    ${typography};
    ${palette};
    text,
    tspan,
    text&,
    tspan& {
      fill: currentColor;
    }
  }
`;

export default ChartLabel;
