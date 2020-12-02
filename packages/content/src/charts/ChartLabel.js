// @flow
import styled from 'styled-components/macro';
import { Chart } from '@devexpress/dx-react-chart';
import { palette, typography } from '@material-ui/system';

const ChartLabel = styled(Chart.Label).attrs(
  ({ variant = 'body1', theme, text, children = text, ...props }) => {
    const { lineHeight, ...typographyProps } = theme.typography[variant];
    return {
      children: !children ? text : children === 'null' ? '' : children,
      ...typographyProps,
      ...props,
    };
  }
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
