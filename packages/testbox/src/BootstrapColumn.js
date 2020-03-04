// @flow
import styled, { css } from 'styled-components/macro';

export type Props = {};

const BootstrapColumn = styled.div.attrs(
  ({
    flexWrap = 'wrap',
    width = 'auto',
    position = 'relative',
    theme: { bootstrap },
    paddingLeft = bootstrap.gridGutterWidth / 2,
    paddingRight = paddingLeft,
  }) => ({
    flexWrap,
    position,
    paddingRight,
    paddingLeft,
    width,
  })
)`
  display: flex;
  min-height: 1px;

  ${({ paddingLeft, paddingRight }) => ({ paddingLeft, paddingRight })};

  ${(props) => css`
    ${breakpointStyle('xs', props)}
    ${breakpointStyle('sm', props)}
    ${breakpointStyle('md', props)}
    ${breakpointStyle('lg', props)}
    ${breakpointStyle('xl', props)}
    ${breakpointStyle('xxl', props)}
  `}
`;

/**
 * @description Generate styles for specific breakpoint.
 * @param {string} key
 * @param {Props} props
 * @returns {string}
 */
const breakpointStyle = (
  key,
  {
    [key]: size,
    theme: { bootstrap, breakpoints },
    maxWidth = (100 * size) / bootstrap.gridColumns,
  }
) =>
  css`
    ${breakpoints.up(key)} {
      flex: 0 0 ${maxWidth}%;
      max-width: ${maxWidth}%;
    }
  `;

export default BootstrapColumn;
