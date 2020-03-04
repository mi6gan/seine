// @flow
import styled from 'styled-components/macro';

export type Props = {
  src?: string,
};

const ThemeSvgIcon = styled.div`
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
  width: 2.6rem;
  height: 2.6rem;
  background-size: cover;
  background-repeat: no-repeat !important;
  background-position: center center !important;
  ${({ src }) => src && { backgroundImage: `url(${src})` }};
`;

export default ThemeSvgIcon;
