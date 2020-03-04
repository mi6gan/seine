// @flow
import { reject, map, mapObjIndexed, o, test, isNil } from 'ramda';
import styled from 'styled-components/macro';

import type { Spacer } from './bream';

export type SpacerProps = {
  marginTop: Spacer,
  marginLeft: Spacer,
  marginBottom: Spacer,
  marginRight: Spacer,

  paddingTop: Spacer,
  paddingLeft: Spacer,
  paddingBottom: Spacer,
  paddingRight: Spacer,
};

export type Props = SpacerProps & {
  position: 'static' | 'relative' | 'absolute' | 'fixed',

  width?: number | string,
  height?: number | string,
};

const isSpacerPropertyName: (string) => boolean = test(
  /^(margin|padding)(Top|Left|Bottom|Right)$/g
);

const filterSpacerProperties: (Props) => SpacerProps = o(
  reject(isNil),
  mapObjIndexed((value, name) => (isSpacerPropertyName(name) ? value : null))
);

const BootstrapBox = styled.div.attrs(
  ({
    marginX = null,
    marginY = null,
    marginTop = marginY,
    marginBottom = marginY,
    marginRight = marginX,
    marginLeft = marginX,

    paddingX = null,
    paddingY = null,
    paddingTop = paddingY,
    paddingBottom = paddingY,
    paddingRight = paddingX,
    paddingLeft = paddingX,
  }) => ({
    marginTop,
    marginBottom,
    marginRight,
    marginLeft,

    paddingTop,
    paddingBottom,
    paddingRight,
    paddingLeft,
  })
)`
  ${({ position }: Props) => position && { position }};

  ${({ width }: Props) => width && { width }};
  ${({ height }: Props) => height && { height }};

  ${({ theme: { bootstrap }, ...props }) =>
    map((spacer) => bootstrap.spacers[spacer], filterSpacerProperties(props))}
`;

export default BootstrapBox;
