// @flow
import styled, { css } from 'styled-components/macro';

export type Props = {
  children?: any,
  fluid?: boolean,
};

const BootstrapContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  ${({ theme: { bootstrap } }) => ({
    paddingLeft: bootstrap.gridGutterWidth / 2,
    paddingRight: bootstrap.gridGutterWidth / 2,
  })};
  width: 100%;
  ${({ fluid = false, theme: { breakpoints } }) =>
    !fluid &&
    css`
      ${breakpoints.down('sm')} {
        ${{ maxWidth: breakpoints.width('sm') }};
      }
      ${breakpoints.down('md')} {
        ${{ maxWidth: breakpoints.width('md') }};
      }
      ${breakpoints.down('lg')} {
        ${{ maxWidth: breakpoints.width('lg') }};
      }
      ${breakpoints.down('xl')} {
        ${{ maxWidth: breakpoints.width('xl') }};
      }
    `}
`;

export default BootstrapContainer;
