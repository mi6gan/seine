// @flow
import styled from 'styled-components/macro';
import {
  compose,
  style,
  breakpoints,
  borders,
  display,
  flexbox,
  palette,
  positions,
  shadows,
  sizing,
  spacing,
  typography,
  typeof TypographyProps,
  typeof BordersProps,
  typeof PositionsProps,
  typeof ShadowsProps,
  typeof SizingProps,
  typeof SpacingProps,
  typeof FlexboxProps,
  typeof DisplayProps,
  typeof PaletteProps,
} from '@material-ui/system';
import type { ComponentType } from 'react';

type StyleProps = SizingProps &
  SpacingProps &
  FlexboxProps &
  DisplayProps &
  PaletteProps &
  TypographyProps &
  BordersProps &
  PositionsProps &
  ShadowsProps & {
    cursor: string,
    textTransform: string,
  };

type Props = $Shape<
  StyleProps & {
    hover: StyleProps,
  }
>;

export type { Props as BoxProps };

export const box = breakpoints(
  compose(
    borders,
    display,
    flexbox,
    palette,
    positions,
    shadows,
    sizing,
    spacing,
    typography,
    style({ prop: 'pointerEvents' }),
    style({ prop: 'cursor' }),
    style({ prop: 'opacity' }),
    style({ prop: 'texTransform' }),
    style({ prop: 'filter' }),
    style({ prop: 'transform' })
  )
);

const Box = styled.div`
  && {
    ${breakpoints(box)};
    &:hover {
      ${({ hover, theme }) => hover && box({ ...hover, theme })};
    }
  }
`;

export default (Box: ComponentType<Props>);
